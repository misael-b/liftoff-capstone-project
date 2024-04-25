package org.launchcode.liftoffgroup1.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class MessageLog {

    @ManyToOne
    private User user1;

    @ManyToOne
    private User user2;

    @Id
    @GeneratedValue
    private int id;

    private boolean user1Delete = false;

    private boolean user2Delete = false;

    public MessageLog () {}

    public MessageLog (User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
    }

    public User getUser1() {return user1;}

    public User getUser2() {return user2;}

    public int getId() {return id;}

    public boolean isUser1Delete() {return user1Delete;}

    public void setUser1Delete(boolean user1Delete) {this.user1Delete = user1Delete;}

    public boolean isUser2Delete() {return user2Delete;}

    public void setUser2Delete(boolean user2Delete) {this.user2Delete = user2Delete;}

}
