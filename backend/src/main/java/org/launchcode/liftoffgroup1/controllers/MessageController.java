package org.launchcode.liftoffgroup1.controllers;


import org.launchcode.liftoffgroup1.model.Message;
import org.launchcode.liftoffgroup1.model.MessageLog;
import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.MessageLogRepository;
import org.launchcode.liftoffgroup1.model.data.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.launchcode.liftoffgroup1.controllers.AuthenticationController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/message")
public class MessageController {

    private MessageRepository messageRepository;


    private MessageLogRepository messageLogRepository;

    private UserController userController;

    @Autowired
    public MessageController(MessageRepository messageRepository, MessageLogRepository messageLogRepository, UserController userController) {
        this.messageRepository = messageRepository;
        this.messageLogRepository = messageLogRepository;
        this.userController = userController;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createMessage (@RequestBody Message message) {
        messageRepository.save(message);
        return ResponseEntity.ok("Message created successfully");
    }

//    @PostMapping("/create")
//    public ResponseEntity<String> createMessageLog (@RequestBody String username, Authentication authentication) {
//        User activeUser = returnUserFromToken(authentication);
//        User receivingUser = userController.findByUsername(username);
//
//    }

//    @GetMapping("/read")
//    public ResponseEntity<String> readMessageLog (/* Some way to identify users */) {
//
//        return ResponseEntity.ok("ok");
//    }
//
    @GetMapping("/readLogs")
    public ResponseEntity<User> readAllMessageLogs (Authentication authentication) {
        User data = returnUserFromToken(authentication);
        return ResponseEntity.ok(data);
    }

    public User returnUserFromToken(Authentication authentication){
        String username = authentication.getName();
        return userController.findByUsername(username);
    }
//    @PutMapping("/update")
//    public ResponseEntity<String> updateMessage () {
//
//        return ResponseEntity.ok("ok");
//    }
//
//    @DeleteMapping("/delete")
//    public ResponseEntity<String> deleteMessage () {
//
//        return ResponseEntity.ok("ok");
//    }
//
//    @DeleteMapping("/deleteLog")
//    public ResponseEntity<String> deleteMessageLog() {
//        // this should require both users in the log to delete. store 2 bools in log database?
//        return ResponseEntity.ok("ok");
//    }


}
