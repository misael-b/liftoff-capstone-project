package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.data.ProductRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("post")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;


    @PostMapping("post")
    public String processCreatePostForm() {
        return "";
    }

    @GetMapping("get")
    public String displayCreatePostForm(Model model) {
        return "post/create-post";
    }

    @PutMapping("put")
    public String displayDeletePostForm(Model model) {
        return "post/delete-post";
    }

    @DeleteMapping("delete")
    public String processDeletePostFrom(){
        return "";
    }
}