package org.launchcode.liftoffgroup1.model;

import java.util.Objects;

public class Product {
    private String name;

    private String description;

    private String picture;

    private String category;

    private double price;


    private final int id;

    private static int nextId = 1;

    public Product() {
        this.id = nextId;
        nextId++;
    }

    public Product(String name, String description, String picture, String category, double price) {
        this();
        this.name = name;
        this.description = description;
        this.picture = picture;
        this.category = category;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product entity = (Product) o;
        return id == entity.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}
