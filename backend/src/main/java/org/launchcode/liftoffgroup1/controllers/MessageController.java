package org.launchcode.liftoffgroup1.controllers;


import org.launchcode.liftoffgroup1.model.Message;
import org.launchcode.liftoffgroup1.model.MessageLog;
import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.MessageLogRepository;
import org.launchcode.liftoffgroup1.model.data.MessageRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.launchcode.liftoffgroup1.model.dto.MessageLogDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.launchcode.liftoffgroup1.controllers.AuthenticationController;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/message")
public class MessageController {

    private MessageRepository messageRepository;
    private MessageLogRepository messageLogRepository;
    private UserController userController;
    private UserRepository userRepository;

    @Autowired
    public MessageController(MessageRepository messageRepository, MessageLogRepository messageLogRepository, UserController userController, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.messageLogRepository = messageLogRepository;
        this.userController = userController;
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createMessage (@RequestBody Message message) {
        messageRepository.save(message);
        return ResponseEntity.ok("Message created successfully");
    }

    @PostMapping("/createLog")
    public ResponseEntity<String> createMessageLog (Authentication authentication, @RequestBody MessageLogDTO user) {
        User activeUser = returnUserFromToken(authentication);
        User receivingUser = returnUserFromUsername(user.getUser());
        messageLogRepository.save(new MessageLog(activeUser, receivingUser));
        return ResponseEntity.ok("Message Log Created");
    }

//    @GetMapping("/read")
//    public ResponseEntity<String> readMessageLog (/* Some way to identify users */) {
//
//        return ResponseEntity.ok("ok");
//    }
//
    @GetMapping("/readLogs")
    public List<MessageLog> readAllMessageLogs (Authentication authentication) {
        User data = returnUserFromToken(authentication);
        Iterable<MessageLog> allLogs = messageLogRepository.findAll();
        List<MessageLog> output = new ArrayList<>();
        allLogs.forEach(item -> {
            if (item.getUser1().getId() == data.getId() || item.getUser2().getId() == data.getId()) {
                output.add(item);
            }
        });
        return ResponseEntity.ok(output).getBody();
    }

    public User returnUserFromToken(Authentication authentication){
        String username = authentication.getName();
        return userController.findByUsername(username);
    }

    public User returnUserFromUsername(String username) {
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
