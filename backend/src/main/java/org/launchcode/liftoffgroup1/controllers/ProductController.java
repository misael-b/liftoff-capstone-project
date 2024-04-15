package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.Product;
import org.launchcode.liftoffgroup1.model.data.ProductRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("post")
@CrossOrigin("http://localhost:3000/")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @SuppressWarnings("unused")
    public ProductController(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<String> processCreatePostForm(@RequestBody Product product) {
        // TODO: Set product user here based on authenticated user
        productRepository.save(product);
        return new ResponseEntity<>("Product Saved", HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<String> updateProductListing(@RequestBody Product product) {
        productRepository.save(product);
        return new ResponseEntity<>("Product Updated", HttpStatus.OK);
    }

    @GetMapping("/get/{searchTerm}")
    public ResponseEntity<Object> displayCreatePostForm(@PathVariable String searchTerm) {
        return new ResponseEntity<>(productRepository.findByNameContainsOrCategoryContainsOrDescriptionContains(searchTerm, searchTerm, searchTerm), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Object> displayCreatePostForm(@PathVariable Integer id) {
        return new ResponseEntity<>(productRepository.findById(id), HttpStatus.OK);
    }

    @GetMapping("/get")
    public ResponseEntity<Object> displayCreatePostForm() {
        return new ResponseEntity<>(productRepository.findAllBy(), HttpStatus.OK);
    }

    @DeleteMapping("/get/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        productRepository.deleteById(id);
        return new ResponseEntity<>("Product deleted", HttpStatus.OK);
    }
}