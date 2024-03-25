package org.launchcode.liftoffgroup1.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.launchcode.liftoffgroup1.model.dto.LoginDTO;
import org.launchcode.liftoffgroup1.model.dto.RegisterDTO;
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
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


//@RestController
//@RequestMapping("api/auth")
@Controller
public class AuthenticationController {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    private static final String userSessionKey = "user";


    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserRepository userRepository,
                                    PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return null;
        }

        return user.get();
    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    @GetMapping("/user/register")
    public String displayRegistrationForm(Model model) {
        model.addAttribute(new RegisterDTO());
        return "user/register";
    }

    @PostMapping("/user/register")
    public String processRegistrationForm(@ModelAttribute RegisterDTO registerFormDTO,
                                          HttpServletRequest request,
                                          Model model) {

//        if (errors.hasErrors()) {
//            model.addAttribute("title", "Register");
//            return "register";
//        }

//        User existingUser = userRepository.findByUsername(registerFormDTO.getUsername()).get();

//        if (existingUser != null) {
//            errors.rejectValue("username", "username.alreadyexists", "A user with that username already exists");
//            model.addAttribute("title", "Register");
//            return "register";
//        }

        String password = registerFormDTO.getPassword();
        String verifyPassword = registerFormDTO.getVerifyPassword();
        if (!password.equals(verifyPassword)) {
//            errors.rejectValue("password", "passwords.mismatch", "Passwords do not match");
//            model.addAttribute("title", "Register");
            model.addAttribute(new RegisterDTO());
            return "user/register";
        }

        User newUser = new User(registerFormDTO.getName(), registerFormDTO.getEmail(),
                registerFormDTO.getUsername(),registerFormDTO.getPassword());
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);

        return "redirect: ";
    }

    @GetMapping("user/login")
    public String displayLoginForm(Model model) {
        model.addAttribute(new LoginDTO());
        return "user/login";
    }

    @PostMapping("user/login")
    public String processLoginForm(@ModelAttribute LoginDTO loginFormDTO,
                                   Errors errors, HttpServletRequest request,
                                   Model model) {

        if (errors.hasErrors()) {
            model.addAttribute("title", "Log In");
            return "user/login";
        }

        Optional<User> theUser = userRepository.findByUsername(loginFormDTO.getUsername());

        if (theUser == null) {
//            errors.rejectValue("username", "user.invalid", "The given username does not exist");
//            model.addAttribute("title", "Log In");
            return "user/login";
        }
        User user = theUser.get();

        String password = loginFormDTO.getPassword();

        if (!user.isMatchingPassword(password)) {
//            errors.rejectValue("password", "password.invalid", "Invalid password");
//            model.addAttribute("title", "Log In");
            return "user/login";
        }

        setUserInSession(request.getSession(), user);

        return "redirect: /user";
    }














    // API:



//    @PostMapping("register")
//    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO){
//        if (userRepository.existsByUsername(registerDTO.getUsername())){
//            return new ResponseEntity<>("Username is taken", HttpStatus.BAD_REQUEST);
//        }
//        User user = new User();
//        user.setUsername(registerDTO.getUsername());
//        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
//        user.setRole("USER");
//        userRepository.save(user);
//        return new ResponseEntity<>("User registered success", HttpStatus.OK);
//
//    }
//
//
//    @PostMapping("login")
//    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO){
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));
//       SecurityContextHolder.getContext().setAuthentication(authentication);
//       return new ResponseEntity<>("login successful", HttpStatus.OK);}
//
}
