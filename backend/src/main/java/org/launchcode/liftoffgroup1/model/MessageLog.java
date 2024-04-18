package org.launchcode.liftoffgroup1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class MessageLog {

//    @ManyToOne
//    private User user;

    @Id
    @GeneratedValue
    private int id;
}
