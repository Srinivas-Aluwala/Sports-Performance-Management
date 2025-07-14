package com.sportsmanagement.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.sportsmanagement.modal.UserInfo;
import com.sportsmanagement.modal.UserRole;

public class CustomUserDetails extends UserInfo implements UserDetails {

    private String username;
    private String password;
    Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(UserInfo byUsername) {
        System.out.println(byUsername + "CustomUserDetails");
        this.username = byUsername.getUsername();
        this.password = byUsername.getPassword();
        super.setUserId(byUsername.getUserId());
        super.setFirstName(byUsername.getFirstName());
        super.setLastName(byUsername.getLastName());
        super.setGender(byUsername.getGender());
        super.setHeight(byUsername.getHeight());
        super.setWeight(byUsername.getWeight());
        super.setBirthDate(byUsername.getBirthDate());
        super.setPhotoUrl(byUsername.getPhotoUrl());
        super.setCategory(byUsername.getCategory());
        super.setRoles(byUsername.getRoles());

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
