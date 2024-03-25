package org.launchcode.liftoffgroup1.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.launchcode.liftoffgroup1.model.dto.LoginDTO;
import org.launchcode.liftoffgroup1.model.dto.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@Controller
public class AuthenticationController {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
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
//    TODO:Error handling

//        if (errors.hasErrors()) {
//
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
//            TODO:Error handling
            model.addAttribute(new RegisterDTO());
            return "user/register";
        }

        User newUser = new User(registerFormDTO.getName(), registerFormDTO.getEmail(),
                registerFormDTO.getUsername(),registerFormDTO.getPassword());
        userRepository.save(newUser);
        request.setAttribute("session", registerFormDTO.getName());

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
//            TODO:Error handling
            return "user/login";
        }
        User user = theUser.get();

        String password = loginFormDTO.getPassword();

        if (!user.isMatchingPassword(password)) {
//            TODO:Error handling
            return "user/login";
        }
        request.setAttribute("session", loginFormDTO.getName());

        return "redirect: /user";
    }

}
