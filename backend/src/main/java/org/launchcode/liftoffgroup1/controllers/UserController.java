package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.data.ProductRepository;
import org.launchcode.liftoffgroup1.model.data.ShoppingCartRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @GetMapping()
    public String displayUserHomePage(Model model){
        model.addAttribute("user", userRepository.findById(1).get());
        return "user/index";
    }

    @GetMapping("shopping-cart")
    public String displayUserShoppingCart(Model model){
        model.addAttribute("products", shoppingCartRepository.findAll());
        model.addAttribute("user", userRepository.findById(1).get());
        return "user/view-shopping-cart";
    }

    @GetMapping("login")
    public String displayUserLoginPage(Model model){
        return "user/login";
    }
}
