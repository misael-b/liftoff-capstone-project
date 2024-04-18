package org.launchcode.liftoffgroup1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class MessageLog {

    @ManyToOne
    private User user;


}
