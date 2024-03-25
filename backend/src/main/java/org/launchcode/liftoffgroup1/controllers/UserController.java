package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.Product;
import org.launchcode.liftoffgroup1.model.data.ProductRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;

@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;


    private ArrayList<Product> shoppingCart;

    private String user = "poijfif";

    public UserController() {
        this.shoppingCart = new ArrayList<>();
    }

    @GetMapping()
    public String displayUserHomePage(Model model, Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        model.addAttribute("user",username);
        return "user/index";
    }

    @GetMapping("shopping-cart")
    public String displayUserShoppingCart(Model model, Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        if (username.equals(user)){
            model.addAttribute("products", shoppingCart);
            model.addAttribute("user", username);
        }else{
            clearShoppingCart();
            model.addAttribute("products", shoppingCart);
            model.addAttribute("user", username);
            user = username;
        }

        return "user/view-shopping-cart";
    }

    public void addToShoppingCart(Product product){
        if(!shoppingCart.contains(product)){
            shoppingCart.add(product);
        }
    }

    public void removeFromShoppingCart(Product product){
        shoppingCart.remove(product);
    }

    public void clearShoppingCart(){
        shoppingCart = new ArrayList<>();
    }

}
