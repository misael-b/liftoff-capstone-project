package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("post")
public class ProductController {
    @Autowired
    private ProductService productService;




    @GetMapping("create")
    public String displayCreatePostForm(Model model) {
        return "post/create-post";
    }

    @PostMapping("create")
    public String processCreatePostForm() {
        return "";
    }

    @GetMapping("delete")
    public String displayDeletePostForm(Model model) {
        return "post/delete-post";
    }

    @PostMapping("delete")
    public String processDeletePostFrom(){
        return "";
    }
}
