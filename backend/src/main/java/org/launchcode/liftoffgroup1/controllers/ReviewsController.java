package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.Product;
import org.launchcode.liftoffgroup1.model.Review;
import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.ReviewsRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping ("/{userId}")
    public List<Review> getUserReviews(@PathVariable int userId) {
        Optional<User> user = userRepository.findById(userId);

       if(user.isEmpty()){
           throw new RuntimeException("user doesn't exist");
       }

        return reviewsRepository.findAllByUserEquals(user.get());
    }

    @PostMapping("")
    public String displayCreateReviewForm(Model model) {

        model.addAttribute("review", new Review());
        return "";
    }


}
