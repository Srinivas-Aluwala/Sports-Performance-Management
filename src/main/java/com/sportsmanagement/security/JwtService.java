package com.sportsmanagement.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {

    public static final String SECRET = "357638792F423F4428472B4B6250655368566D597133743677397A2443264629";

    public static final long ACCESS_TOKEN_EXPIRY = 1000 * 60 * 15; // 15 mins

    public static final long REFRESH_TOKEN_EXPIRY = 1000L * 60 * 60 * 24 * 7; // 7 days

    //////////////////////////////////// util claims //////////////////////////////

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /////////////////////////////////// token genertion
    /////////////////////////////////// //////////////////////////////////////

    public String GenerateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username, ACCESS_TOKEN_EXPIRY);
    }

    public String GenerateRefreshToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username, REFRESH_TOKEN_EXPIRY);
    }

    private String createToken(Map<String, Object> claims, String username, long expiryTime) {

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiryTime))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean isRefreshTokenValid(String token) {

        try {

            String username = extractUsername(token); // any exceptions with extracting the usernae would through
                                                      // exception so try catch & to ceck if the token is malformed
                                                      System.out.println(username);

            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }

    }

}
