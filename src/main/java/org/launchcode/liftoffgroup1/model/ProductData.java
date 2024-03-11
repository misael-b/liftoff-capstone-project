package org.launchcode.liftoffgroup1.model;

import java.util.ArrayList;
import java.util.Collections;

public class ProductData {
    private static ArrayList<Product> allProducts;

    private static ArrayList<User> allUsers;

    private static boolean isDataLoaded = false;


    public static ArrayList<Product> findAllProducts(){
        loadData();
        return allProducts;
    }

    public static ArrayList<Product> findBySearchTerm(String searchTerm){
        loadData();
        ArrayList<Product> products = new ArrayList<>();
        for (Product product : allProducts){
            if(product.getCategory().toLowerCase().contains(searchTerm.toLowerCase())){
                products.add(product);
            }else if (product.getName().toLowerCase().contains(searchTerm.toLowerCase())){
                products.add(product);
            }else if (product.getDescription().toLowerCase().contains(searchTerm.toLowerCase())){
                products.add(product);
            }
        }

        return products;
    }

    public static ArrayList<Product> sortByPrice(String type, ArrayList<Product> products){
        loadData();
        ArrayList<Product> sortedProducts = new ArrayList<>();
        ArrayList<Double> sortedPrices = new ArrayList<>();
        for (Product product : products){
            Double price = product.getPrice();
            sortedPrices.add(price);
        }
        Collections.sort(sortedPrices);

        for (Double price : sortedPrices){
            for (Product product : products){
                if (price == product.getPrice() && !sortedProducts.contains(product)){
                    if (type.equals("high to low")){
                        sortedProducts.add(0, product);
                    }else if(type.equals("low to high")){
                        sortedProducts.add(product);
                    }

                }
            }
        }

        return sortedProducts;
    }


    public static void loadData(){
        if (isDataLoaded) {
            return;
        }
            allProducts = new ArrayList<>();
            Product product1 = new Product("Macbook Pro","MacBook is a brand of Mac notebook computers designed and marketed by Apple that use Apple's macOS operating system",
                    "https://www.cnet.com/a/img/resize/7dc61a88052f656e89de965da1bd3c3f5b71e58b/hub/2017/06/06/349b7e65-a855-44f0-ae0a-6610ebca0809/apple-macbook-pro-12-inch-2017-4181.jpg?auto=webp&fit=crop&height=900&width=1200",
                    "electronics", 1599);

            Product product2 = new Product("Bed Frame", "A timeless beauty in solid wood that becomes the centerpiece of your bedroom",
                    "https://www.ikea.com/us/en/images/products/hemnes-bed-frame-with-4-storage-boxes-black-brown-luroey__1101564_pe866739_s5.jpg?f=s",
                    "furniture", 569);

            Product product3 = new Product("65in TV",
                    "The OLED evo C-Series is powered by the α9 AI Processor Gen6 for beautiful picture and performance",
                    "https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/aa1893b5-0440-4ff8-bbba-52bdf35248e1/OLED65C3AUA_gallery_01_front_3000x3000",
                    "electronics", 1599.99);

            Product product4 = new Product("SAMSUNG 32-inch TV", "Access your favorite program choices, live TV, video on demand, apps and social media in one easy-to-browse navigation experience",
                    "https://m.media-amazon.com/images/I/91+tRvBTNkL.jpg", "electronics", 197.99);

            Product product5 = new Product("Apple iPhone 15 Pro",
                    "Forged in titanium and featuring the groundbreaking A17 Pro chip",
                    "https://i5.walmartimages.com/seo/AT-T-Apple-iPhone-15-Pro-128GB-Natural-Titanium_79baf43f-cbc5-44b3-b066-5b7c88b6dfec.77e2bd5aadd90f19f91b7846d14c2b0e.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
                    "electronics", 1049);

            Product product6 = new Product("HONBAY Modular Sectional Sofa",
                    "beautiful and comfortable sofa that can perfectly match your living room, house or conference",
                    "https://m.media-amazon.com/images/I/711R-ZB95fS.jpg", "furniture", 1199.99);



            allProducts.add(product1);
            allProducts.add(product2);
            allProducts.add(product3);
            allProducts.add(product4);
            allProducts.add(product5);
            allProducts.add(product6);
        isDataLoaded = true;




    }
}
