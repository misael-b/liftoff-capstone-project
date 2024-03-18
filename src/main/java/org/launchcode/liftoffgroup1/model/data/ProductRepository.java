package org.launchcode.liftoffgroup1.model.data;

import org.launchcode.liftoffgroup1.model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {
    public List<Product> findByNameContainsOrCategoryContainsOrDescriptionContains(String name, String category, String description);

    public List<Product> findAllBy();

}
