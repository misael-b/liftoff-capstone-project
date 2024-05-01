package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.comparator.CategoryComparator;
import org.launchcode.liftoffgroup1.model.comparator.NameComparator;
import org.launchcode.liftoffgroup1.model.Product;
import org.launchcode.liftoffgroup1.model.comparator.NameComparatorBackwards;
import org.launchcode.liftoffgroup1.model.data.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@CrossOrigin("http://localhost:3000/")
public class SearchAndSortController {
    @Autowired
    private ProductRepository productRepository;


    @GetMapping("list")
    public List<Product> displayAllProducts(){
        return (List<Product>) productRepository.findAll();
    }


//    http://localhost:8080/search?searchTerm=tv
    @GetMapping("search")
    public List<Product> displaySearchResults(@RequestParam String searchTerm, @RequestParam String sort){
        return  search(searchTerm, sort);
    }

    @GetMapping("list/{sort}")
    public List<Product> sortAllResults(@PathVariable String sort){
       List<Product> products = (List<Product>) productRepository.findAll();
       return sortByPrice(products, sort);
    }

    public List<Product> search(String term) {
        List<Product> products = productRepository.findByNameContainsOrCategoryContainsOrDescriptionContains(term, term, term);

        return products;
    }

    public List<Product> search(String term, String sort) {
        List<Product> products = productRepository.findByNameContainsOrCategoryContainsOrDescriptionContains(term, term, term);
        if(sort.isEmpty()){
            return products;
        }else {
            return sortByPrice(products,sort);
        }
    }

    private List<Product> sortByPrice(List<Product> products, String sort) {
        if (sort.equals("asc")){
            products.sort((o1, o2) -> Double.compare(o1.getPrice(), o2.getPrice()));
        }else if(sort.equals("desc")){
            products.sort((o1, o2) -> Double.compare(o2.getPrice(), o1.getPrice()));
        } else if (sort.equals("category-asc")) {
            Comparator<Product> comparator = new CategoryComparator();
            products.sort(comparator);
        }else if (sort.equals("name-asc")) {
            Comparator<Product> comparator = new NameComparator();
            products.sort(comparator);
        }else if (sort.equals("name-desc")) {
            Comparator<Product> comparator = new NameComparatorBackwards();
            products.sort(comparator);
        }

        return products;
    }
}
