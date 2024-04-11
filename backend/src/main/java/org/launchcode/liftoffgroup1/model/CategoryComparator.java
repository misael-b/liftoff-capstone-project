package org.launchcode.liftoffgroup1.model;

import java.util.Comparator;

public class CategoryComparator implements Comparator<Product> {
    @Override
    public int compare(Product o1, Product o2) {
        return o1.getCategory().compareTo(o2.getCategory());
    }
}
