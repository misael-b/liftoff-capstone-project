package org.launchcode.liftoffgroup1.model;

import jakarta.persistence.*;

@Entity
public class Role {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        private String name;


        public String getName() {
                return name;
        }

        public void setName(String name) {
                this.name = name;
        }
}

