package com.nerdma.noteapp;

import com.nerdma.noteapp.Models.UserModel;
import com.nerdma.noteapp.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class LoginRequest {

    @Autowired
    private UserRepository userRepository;
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
