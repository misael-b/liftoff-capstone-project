package org.launchcode.liftoffgroup1.controllers;

import com.fasterxml.jackson.databind.util.ArrayIterator;
import org.launchcode.liftoffgroup1.model.Product;
import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.ProductRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<String> processCreatePostForm(@RequestBody Product product, Authentication authentication) {
        String username = authentication.getName();
        Optional<User> user = userRepository.findByUsername(username);
        product.setUser(user.orElseThrow());
        productRepository.save(product);
        return new ResponseEntity<>("Product Saved", HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<String> updateProductListing(@RequestBody Product product) {
        productRepository.save(product);
        return new ResponseEntity<>("Product Updated", HttpStatus.OK);
    }

    @GetMapping("/get/{searchTerm}")
    public ResponseEntity<Object> displayProductBySearchTerm(@PathVariable String searchTerm) {
        return new ResponseEntity<>(productRepository.findByNameContainsOrCategoryContainsOrDescriptionContains(searchTerm, searchTerm, searchTerm), HttpStatus.OK);
    }

    @GetMapping("/get/product/{id}")
    public ResponseEntity<Object> displayProductById(@PathVariable Integer id) {
        return new ResponseEntity<>(productRepository.findById(id), HttpStatus.OK);
    }

    @GetMapping("list")
    public List<Product> displayAllProducts(Model model, @RequestParam(required = false) String sortBy){
        return (List<Product>) productRepository.findAll();

    }

    @GetMapping("/get/user")
    public ResponseEntity<Object> displayUserProducts(Authentication authentication) {
        String username = authentication.getName();
        Optional<User> user = userRepository.findByUsername(username);
        return new ResponseEntity<>(productRepository.findByUser(user.get()), HttpStatus.OK);

    }

    @DeleteMapping("/get/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        productRepository.deleteById(id);
        return new ResponseEntity<>("Product deleted", HttpStatus.OK);
    }

    @GetMapping("/user-posts")
    public ResponseEntity<Object> displayProductsByUser(Authentication authentication){
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).get();
        int id = user.getId();
        Iterable<Product> allProducts = productRepository.findAll();
        ArrayList<Product> productsbyId = new ArrayList<>();
        for(Product product: allProducts){
            if (product.getUser().getId() == id){
                productsbyId.add(product);
            }
        }
        return new ResponseEntity<>(productsbyId, HttpStatus.OK);
    }
}