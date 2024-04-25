package org.launchcode.liftoffgroup1.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Message {

    private String message;

    @ManyToOne
    private User user;

    private Date date;

    @ManyToOne
    private MessageLog messageLog;

    @Id
    @GeneratedValue
    private int id;

    public Message (String aMessage, User aUser, MessageLog aMessageLog) {
        message = aMessage;
        user = aUser;
        messageLog = aMessageLog;
        date = new Date();
    }

    public Message () {}

    public String getMessage() {return message;}

    public void setMessage(String aMessage) {message = aMessage;}

   public User getUser() {return user;}

    public Date getDate() {return date;}

    public int getId() {return id;}

    public MessageLog getMessageLog() {return messageLog;}

    public void setMessageLog(MessageLog messageLog) {this.messageLog = messageLog;}
}
