package org.launchcode.liftoffgroup1.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
//import org.launchcode.liftoffgroup1.model.dto.AuthResponseDTO;
import org.launchcode.liftoffgroup1.model.dto.LoginDTO;
import org.launchcode.liftoffgroup1.model.dto.RegisterDTO;
//import org.launchcode.liftoffgroup1.security.JwtTokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/auth")
public class AuthenticationController {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

//    private JwtTokenGenerator jwtTokenGenerator;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserRepository userRepository,
                                    PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
//        this.jwtTokenGenerator = jwtTokenGenerator;
    }

//    private static final String userSessionKey = "user";
//
//
//    @GetMapping("/user/register")
//    public String displayRegistrationForm(Model model) {
//
//        return "user/register";
//    }
//
//    @PostMapping("/user/register")
//    public String processRegistrationForm(@ModelAttribute User user,
//                                           HttpServletRequest request,
//                                          Model model) {
//
//        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
//
//        if (existingUser != null) {
//            return "register";
//        }

//        String password = user.getPassword();
//        String verifyPassword = user.getVerifyPassword();
//        if (!password.equals(verifyPassword)) {
//            errors.rejectValue("password", "passwords.mismatch", "Passwords do not match");
//            model.addAttribute("title", "Register");
//            return "register";
//        }

//        User newUser = new User(user.getName(),user.getEmail(), user.getUsername(), user.getPassword());
//        userRepository.save(newUser);
//        setUserInSession(request.getSession(), newUser);
//
//        return "redirect:";
//    }
//
//
//    public User getUserFromSession(HttpSession session) {
//        Integer userId = (Integer) session.getAttribute(userSessionKey);
//        if (userId == null) {
//            return null;
//        }
//
//        Optional<User> user = userRepository.findById(userId);
//
//        if (user.isEmpty()) {
//            return null;
//        }
//
//        return user.get();
//    }
//
//    private static void setUserInSession(HttpSession session, User user) {
//        session.setAttribute(userSessionKey, user.getId());
//    }
















  // API:



    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO){
        if (userRepository.existsByUsername(registerDTO.getUsername())){
            return new ResponseEntity<>("Username is taken", HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setRole("USER");
        userRepository.save(user);
        return new ResponseEntity<>("User registered success", HttpStatus.OK);

    }

//   @PostMapping("login")
//    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO){
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));
//       SecurityContextHolder.getContext().setAuthentication(authentication);
//       String token = jwtTokenGenerator.generateToken(authentication);
//       return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
//   }

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));
       SecurityContextHolder.getContext().setAuthentication(authentication);
//       String token = jwtTokenGenerator.generateToken(authentication);
       return new ResponseEntity<>("login successful", HttpStatus.OK);}

}
