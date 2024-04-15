package org.launchcode.liftoffgroup1.model;

import jakarta.persistence.Entity;

import java.util.Date;

@Entity
public class Message {

    private String message;

    private User user;

    private Date date;

    public Message (String aMessage, User aUser) {
        message = aMessage;
        user = aUser;
        date = new Date();
    }

    public String getMessage() {return message;}

    public void setMessage(String aMessage) {message = aMessage;}

    public User getUser() {return user;}

    public Date getDate() {return date;}

}
