package org.launchcode.liftoffgroup1.controllers;

import jakarta.validation.Valid;
import org.launchcode.liftoffgroup1.model.Role;
import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.ProductRepository;
import org.launchcode.liftoffgroup1.model.data.RoleRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.launchcode.liftoffgroup1.model.dto.RegisterDTO;
import org.launchcode.liftoffgroup1.security.JwtTokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {

    private ProductRepository productRepository;

    private UserRepository userRepository;
    private RoleRepository roleRepository;


    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;

    private JwtTokenGenerator tokenGenerator;

    @Autowired
    public UserController(ProductRepository productRepository, UserRepository userRepository,
                          PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                          RoleRepository roleRepository, JwtTokenGenerator tokenGenerator) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
        this.tokenGenerator = tokenGenerator;
    }

    @GetMapping("/{username}")
    public User getUserInfo(@PathVariable String username){
        return findByUsername(username);
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDTO registerDTO){
        if (userRepository.existsByUsername(registerDTO.getUsername())){
            return new ResponseEntity<>("Username is taken", HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setName(registerDTO.getName());
        user.setEmail(registerDTO.getEmail());

        Role role = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(role));

        userRepository.save(user);
        return new ResponseEntity<>("User registered success", HttpStatus.OK);

    }

    @PatchMapping("/{username}")
    public ResponseEntity<String> editUser(@PathVariable String username, @RequestBody RegisterDTO registerDTO){
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(!registerDTO.getName().isEmpty()){
                user.setName(registerDTO.getName());
            }

            if(!registerDTO.getEmail().isEmpty()){
                user.setEmail(registerDTO.getEmail());
            }

            if(!registerDTO.getPassword().isEmpty()){
                user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
            }

            userRepository.save(user);
            return new ResponseEntity<>("User details have been updated!", HttpStatus.OK);
        }
        return new ResponseEntity<>("User does not exist!", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@RequestBody RegisterDTO registerDTO){
        Optional<User> user = userRepository.findByUsername(registerDTO.getUsername());
        if(user.isPresent()){
            User user1 = user.get();
            userRepository.delete(user1);
            return new ResponseEntity<>("User has been deleted!", HttpStatus.OK);
        }
        return new ResponseEntity<>("User does not exist!", HttpStatus.NOT_FOUND);

    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username).orElse(null);
//        Iterable<User> users  = userRepository.findAll();
//        for(User user : users){
//            String userName = user.getUsername();
//            if(userName.equals(username)){
//                return user;
//            }
//        }
//        return null;
    }


}