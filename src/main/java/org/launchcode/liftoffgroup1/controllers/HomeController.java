package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.Product;
import org.launchcode.liftoffgroup1.model.ProductData;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;


@Controller
public class HomeController {

    @GetMapping("/")
    public String index(Model model) {


        model.addAttribute("title", "Welcome to the Marketplace");

        return "index";
    }

    @RequestMapping("list")
    public String displayAllProducts(Model model, @RequestParam(required = false) String sortBy){
        ArrayList<Product> products =  ProductData.findAllProducts();
        if(!(sortBy == null)){
            ArrayList<Product> sortedProducts =  ProductData.sortByPrice(sortBy,products);
            model.addAttribute("products", sortedProducts);
        }else {
            model.addAttribute("products", products);
        }

        return "list";
    }

    @PostMapping("search")
    public String displaySearchResults(Model model, @RequestParam String searchTerm, @RequestParam(required = false) String sortBy){
        model.addAttribute("searchTerm", searchTerm);
        ArrayList<Product> products =  ProductData.findBySearchTerm(searchTerm);
        if(!(sortBy == null)){
            ArrayList<Product> sortedProducts =  ProductData.sortByPrice(sortBy,products);
            model.addAttribute("products", sortedProducts);
        }else {
            model.addAttribute("products", products);
        }
        return "list-search";
    }


}
