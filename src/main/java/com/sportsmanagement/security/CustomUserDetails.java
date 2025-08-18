package com.sportsmanagement.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.sportsmanagement.VO.auth.UsersVO;
import com.sportsmanagement.modal.UserRole;


public class CustomUserDetails extends UsersVO implements UserDetails {

    private String username;
    private String password;
    Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(UsersVO byUsername) {



        System.out.println(byUsername + "CustomUserDetails");
        super.setUserId(byUsername.getUserId());  
        this.username = byUsername.getUsername();
        this.password = byUsername.getPassword();
        super.setRoles(byUsername.getRoles());
        super.setAthlete(byUsername.getAthlete());
        super.setCoache(byUsername.getCoache());

        List<GrantedAuthority> auths = new ArrayList<>();

        for (UserRole role : byUsername.getRoles()) {

            auths.add(new SimpleGrantedAuthority(role.getRoleName().toUpperCase()));
        }
        this.authorities = auths;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
