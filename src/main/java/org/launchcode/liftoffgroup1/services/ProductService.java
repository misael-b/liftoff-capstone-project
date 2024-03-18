package org.launchcode.liftoffgroup1.services;

import org.launchcode.liftoffgroup1.model.Product;
import org.launchcode.liftoffgroup1.model.data.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
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
