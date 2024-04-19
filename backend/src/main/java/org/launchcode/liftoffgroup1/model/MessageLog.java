package org.launchcode.liftoffgroup1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class MessageLog {

    private User user1;
    private User user2;

    @Id
    @GeneratedValue
    private int id;

    public MessageLog (User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
    }
}
