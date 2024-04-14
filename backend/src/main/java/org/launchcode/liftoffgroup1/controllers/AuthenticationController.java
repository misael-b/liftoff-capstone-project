package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.dto.LoginDTO;
import org.launchcode.liftoffgroup1.service.TokenService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("login")
@CrossOrigin("http://localhost:3000/")
public class AuthenticationController {
    private final TokenService tokenService;
//    private final AuthenticationManager authenticationManager;


    public AuthenticationController(TokenService tokenService
//            , AuthenticationManager authenticationManager
    ) {
        this.tokenService = tokenService;
//        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/token")
    public String Token(Authentication authentication){
        String token = tokenService.generateToken(authentication);
        return token;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDTO loginRequest) {
        Authentication authenticationRequest =
                UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.getUsername(), loginRequest.getPassword());
//        Authentication authenticationResponse =
//                this.authenticationManager.authenticate(authenticationRequest);
//        String token = tokenService.generateToken(authenticationResponse);
//        return token;
        return "LOGGED IN";
    }
}
