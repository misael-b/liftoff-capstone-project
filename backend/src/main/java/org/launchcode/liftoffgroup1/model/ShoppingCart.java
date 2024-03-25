package org.launchcode.liftoffgroup1.model;

import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;


public class ShoppingCart {
    private ArrayList<Product> shoppingCart;

    public ShoppingCart() {
        shoppingCart = new ArrayList<>();
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
