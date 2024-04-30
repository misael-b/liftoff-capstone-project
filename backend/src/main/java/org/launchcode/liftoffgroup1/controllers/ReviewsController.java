package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.Product;
import org.launchcode.liftoffgroup1.model.Review;
import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.ProductRepository;
import org.launchcode.liftoffgroup1.model.data.ReviewsRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/review")
@CrossOrigin("http://localhost:3000/")
public class ReviewsController {

    @Autowired
    private ReviewsRepository reviewsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Review>> getUserReviews(@PathVariable int userId) {
        Product product = productRepository.findById(userId).get();
        User user = product.getUser();
        return new ResponseEntity<>(reviewsRepository.findAllByUserEquals(user), HttpStatus.OK);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Review> displayCreateReviewForm(@RequestBody Review review, @PathVariable int userId, Authentication authentication) {

        Product product = productRepository.findById(userId).get();
        String reviewer = authentication.getName();
        User user = product.getUser();

        review.setUser(user);
        review.setReviewer(reviewer);
        return new ResponseEntity<>(reviewsRepository.save(review), HttpStatus.OK);
    }
}
