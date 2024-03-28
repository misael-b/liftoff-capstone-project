package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.launchcode.liftoffgroup1.model.dto.AuthResponseDTO;
import org.launchcode.liftoffgroup1.model.dto.LoginDTO;
import org.launchcode.liftoffgroup1.security.JwtTokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("login")
public class AuthenticationController {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;


    private JwtTokenGenerator jwtTokenGenerator;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserRepository userRepository, JwtTokenGenerator jwtTokenGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtTokenGenerator = jwtTokenGenerator;
    }

  // API:




   @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));
       SecurityContextHolder.getContext().setAuthentication(authentication);
       String token = jwtTokenGenerator.generateToken(authentication);
       return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
   }

//    @PostMapping("login")
//    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO){
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));
//       SecurityContextHolder.getContext().setAuthentication(authentication);
//       String token = jwtTokenGenerator.generateToken(authentication);
//       return new ResponseEntity<>("login successful", HttpStatus.OK);}

}
