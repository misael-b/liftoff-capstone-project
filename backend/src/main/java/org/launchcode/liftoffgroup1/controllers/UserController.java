package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.ProductRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.launchcode.liftoffgroup1.model.dto.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("user")
@CrossOrigin("http://localhost:3000/")
public class UserController {

    private ProductRepository productRepository;

    private UserRepository userRepository;


    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(ProductRepository productRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/{username}")
    public User getUserInfo(@PathVariable String username){
        return findByUsername(username);
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO){
        if (userRepository.existsByUsername(registerDTO.getUsername())){
            return new ResponseEntity<>("Username is taken", HttpStatus.BAD_REQUEST);
        }
        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setRole("USER");
        user.setName(registerDTO.getName());
        user.setEmail(registerDTO.getEmail());
        userRepository.save(user);
        return new ResponseEntity<>("User registered success", HttpStatus.OK);

    }

    @PatchMapping("/{username}")
    public ResponseEntity<String> editUser(@PathVariable String username, @RequestBody RegisterDTO registerDTO){
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            user.setName(registerDTO.getName());
            user.setEmail(registerDTO.getEmail());
            user.setPassword(registerDTO.getPassword());
            userRepository.save(user);
            return new ResponseEntity<>("User details have been updated!", HttpStatus.OK);
        }
        return new ResponseEntity<>("User does not exist!", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username, @RequestBody RegisterDTO registerDTO){
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()){
            User user1 = user.get();
            userRepository.delete(user1);
            return new ResponseEntity<>("User has been deleted!", HttpStatus.OK);
        }
        return new ResponseEntity<>("User does not exist!", HttpStatus.NOT_FOUND);

    }

    public User findByUsername(String username){
        Iterable<User> users  = userRepository.findAll();
        for(User user : users){
            String userName = user.getUsername();
            if(userName.equals(username)){
                return user;
            }
        }
        return null;
    }


}