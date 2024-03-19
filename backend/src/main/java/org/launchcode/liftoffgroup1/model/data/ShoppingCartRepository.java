package org.launchcode.liftoffgroup1.model.data;

import org.launchcode.liftoffgroup1.model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartRepository extends CrudRepository<Product, Integer> {
}
