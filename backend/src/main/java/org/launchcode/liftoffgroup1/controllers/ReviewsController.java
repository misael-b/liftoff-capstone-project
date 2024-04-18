package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.Product;
import org.launchcode.liftoffgroup1.model.Review;
import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.ReviewsRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController("/review")
@CrossOrigin("http://localhost:3000/")
public class ReviewsController {

    @Autowired
    private ReviewsRepository reviewsRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Review>> getUserReviews(@PathVariable int userId) {
        Optional<User> user = userRepository.findById(userId);

       if(user.isEmpty()){
           throw new RuntimeException("user doesn't exist");
       }
        return new ResponseEntity<>(reviewsRepository.findAllByUserEquals(user.get()), HttpStatus.OK);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Review> displayCreateReviewForm(@RequestBody Review review, @PathVariable int userId) {
        Optional<User> user = userRepository.findById(userId);

        if(user.isEmpty()){
            throw new RuntimeException("user doesn't exist");
        }
        review.setUser(user.get());
        return new ResponseEntity<>(reviewsRepository.save(review), HttpStatus.OK);
    }
}
