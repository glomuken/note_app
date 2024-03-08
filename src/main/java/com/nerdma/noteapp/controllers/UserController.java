package com.nerdma.noteapp.controllers;

import com.nerdma.noteapp.LoginRequest;
import com.nerdma.noteapp.NewUser;
import com.nerdma.noteapp.models.UserModel;
import com.nerdma.noteapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class UserController {
    private final UserRepository userRepository;



    @Autowired
    public UserController(UserRepository _userRepository, LoginRequest loginRequest){
        this.userRepository = _userRepository;
    }


    @GetMapping("/")
    public RedirectView LoginPage() {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("/loginForm.html");
        return redirectView;
    }
    @GetMapping("/login")
    public RedirectView Login() {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("/loginForm.html");
        return redirectView;
    }

    @GetMapping("/sign-up")
    public RedirectView SignUpPage() {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("signUpForm.html");
        return redirectView;
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getEmail();
        UserModel user = userRepository.findByEmail(username);
        if (user != null) {
            String redirectUrl = "/profile/" + username;
            return ResponseEntity.ok().body("{\"redirectUrl\": \"" + redirectUrl + "\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username/email address.");
        }
    }

    @PostMapping("/sign-up")
    public ResponseEntity<String> processRegistration(@RequestBody NewUser newUser) {
        if (userRepository.findByEmail(newUser.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Email is already registered.\"}");
        }

        UserModel user = new UserModel();
        user.setEmail(newUser.getEmail());

        userRepository.save(user);

        return ResponseEntity.ok().body("{\"message\": \"User registered successfully.\"}");
    }
}
