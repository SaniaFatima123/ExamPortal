package com.examportal.backend.models;

import org.springframework.security.core.GrantedAuthority;

import java.security.PublicKey;

public class Authority implements GrantedAuthority {
    private  String authority;



    public Authority(String authority){
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return  this.authority;
    }
}
