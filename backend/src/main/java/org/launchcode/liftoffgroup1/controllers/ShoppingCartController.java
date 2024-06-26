package org.launchcode.liftoffgroup1.controllers;


import org.launchcode.liftoffgroup1.model.Product;
import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.ProductRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/ShoppingCart")
@CrossOrigin("http://localhost:3000/")
public class ShoppingCartController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;
    private ArrayList<Product> shoppingCart;

    private Object credentials;

    public ShoppingCartController() {
        this.shoppingCart = new ArrayList<>();
    }



    // http://localhost:8080/ShoppingCart/add?Id=1
    @PostMapping("add")
    public ResponseEntity processAddToShoppingCart(@RequestParam int Id){
        Optional<Product> productOptional = productRepository.findById(Id);
        if (productOptional.isPresent()){
            Product product = productOptional.get();
            addToShoppingCart(product);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    //    http://localhost:8080/ShoppingCart/remove?Id=1
    @DeleteMapping("remove")
    public ResponseEntity processRemoveFromShoppingCart(@RequestParam int Id){
        Optional<Product> productOptional = productRepository.findById(Id);
        if (productOptional.isPresent()){
            Product product = productOptional.get();
            removeFromShoppingCart(product);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }


    // http://localhost:8080/ShoppingCart
    @GetMapping("")
    public List<Product> displayUserShoppingCart(Authentication authentication){
        Object credentials = authentication.getCredentials();
        if (this.credentials == null){
            this.credentials = credentials;
        }else{
            if (!this.credentials.equals(credentials)) {
                clearShoppingCart();
                this.credentials = credentials;
                return shoppingCart;

            }

        }


        return shoppingCart;
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