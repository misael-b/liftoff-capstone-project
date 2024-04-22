package org.launchcode.liftoffgroup1.model;

import jakarta.persistence.*;

@Entity
public class MessageLog {

    @ManyToOne
    private User user1;

    @ManyToOne
    private User user2;

    @Id
    @GeneratedValue
    private int id;

    public MessageLog (User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
    }

    public User getUser1() {return user1;}

    public User getUser2() {return user2;}

    public int getId() {return id;}
}
