package org.launchcode.liftoffgroup1.controllers;

import org.launchcode.liftoffgroup1.model.Product;
import org.launchcode.liftoffgroup1.model.data.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.Optional;


@Controller
public class HomeController {
    @Autowired
    private ProductRepository productRepository;


    private UserController userController;

    public HomeController(UserController userController) {
        this.userController = userController;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("title", "Welcome to the Marketplace");
        return "index";
    }

    @RequestMapping("list")
    public String displayAllProducts(Model model, @RequestParam(required = false) String sortBy){
        if (sortBy == null){
            model.addAttribute("products", productRepository.findAll());
            return "list";
        }
        List<Product> products = list(sortBy);
        model.addAttribute("products", products);
        return "list";
    }

    @RequestMapping("search")
    public String displaySearchResults(Model model, @RequestParam String searchTerm, @RequestParam(required = false) String sortBy){
        model.addAttribute("searchTerm", searchTerm);
        List<Product> products = search(searchTerm, sortBy);
        model.addAttribute("products", products);
        return "list-search";
    }


    @PostMapping("addToShoppingCart")
    public String processAddToShoppingCart(@RequestParam int shoppingCartId){
        Optional<Product> productOptional = productRepository.findById(shoppingCartId);
        if (productOptional.isPresent()){
            Product product = productOptional.get();
            //product.setInShoppingCart(true);
            userController.addToShoppingCart(product);
            //shoppingCartRepository.save(product);
        }

        return "redirect:list";
    }

    @PostMapping("addToShoppingCartSearch")
    public String processAddToShoppingCartSearch(RedirectAttributes redirectAttributes, @RequestParam int shoppingCartId, @RequestParam String searchTerm, @RequestParam(required = false) String sortBy){
        Optional<Product> productOptional = productRepository.findById(shoppingCartId);
        if (productOptional.isPresent()){
            Product product = productOptional.get();
//            product.setInShoppingCart(true);
//            shoppingCartRepository.save(product);
            userController.addToShoppingCart(product);
        }
        redirectAttributes.addAttribute("searchTerm", searchTerm);
        List<Product> products = search(searchTerm, sortBy);
        redirectAttributes.addAttribute("products", products);

        return "redirect:search";
    }

    @PostMapping("removeFromShoppingCart")
    public String processRemoveFromShoppingCart(@RequestParam int removeShoppingCartId){
        Optional<Product> productOptional = productRepository.findById(removeShoppingCartId);
        if (productOptional.isPresent()){
            Product product = productOptional.get();
//            product.setInShoppingCart(false);
//            productRepository.save(product);
            userController.removeFromShoppingCart(product);
        }
        return "redirect:/user/shopping-cart";
    }

    public List<Product> list(String sortBy) {
        List<Product> products = productRepository.findAllBy();
        products = sortByPrice(products, sortBy == null || sortBy.equals("low to high"));
        return products;
    }

    public List<Product> search(String term, String sortBy) {
        List<Product> products = productRepository.findByNameContainsOrCategoryContainsOrDescriptionContains(term, term, term);

        products = sortByPrice(products, sortBy == null || sortBy.equals("low to high"));

        return products;
    }

    private List<Product> sortByPrice(List<Product> products, boolean asc) {
        if (asc)
            products.sort((o1, o2) -> Double.compare(o1.getPrice(), o2.getPrice()));
        else
            products.sort((o1, o2) -> Double.compare(o2.getPrice(), o1.getPrice()));

        return products;
    }
}
