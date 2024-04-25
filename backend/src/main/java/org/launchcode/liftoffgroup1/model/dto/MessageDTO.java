package org.launchcode.liftoffgroup1.model.dto;

public class MessageDTO {

    private String message;
    private String user;
    private String otherUser;

    public String getMessage() {
        return message;
    }

    public String getUsername() {
        return user;
    }

    public String getOtherUsername() {
        return otherUser;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setOtherUser(String otherUser) {
        this.otherUser = otherUser;
    }
}
