package org.launchcode.liftoffgroup1.model.comparator;

import org.launchcode.liftoffgroup1.model.Product;

import java.util.Comparator;

public class NameComparatorBackwards implements Comparator<Product> {
    @Override
    public int compare(Product o2, Product o1) {
        return o1.getName().compareTo(o2.getName());
    }
}
