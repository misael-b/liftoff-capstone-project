package org.launchcode.liftoffgroup1.model.data;

import org.launchcode.liftoffgroup1.model.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.List;

public interface ProductRepository extends CrudRepository<Product, Integer> {
    public List<Product> findByNameContainsOrCategoryContainsOrDescriptionContains(String name, String category, String description);

    public List<Product> findAllBy();

}
