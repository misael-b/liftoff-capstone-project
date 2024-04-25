package org.launchcode.liftoffgroup1.controllers;


import org.launchcode.liftoffgroup1.model.Message;
import org.launchcode.liftoffgroup1.model.MessageLog;
import org.launchcode.liftoffgroup1.model.User;
import org.launchcode.liftoffgroup1.model.data.MessageLogRepository;
import org.launchcode.liftoffgroup1.model.data.MessageRepository;
import org.launchcode.liftoffgroup1.model.data.UserRepository;
import org.launchcode.liftoffgroup1.model.dto.MessageDTO;
import org.launchcode.liftoffgroup1.model.dto.MessageLogDTO;
import org.launchcode.liftoffgroup1.model.dto.ReadMessageLogDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    public ResponseEntity<String> createMessage (@RequestBody MessageDTO messageDTO) {
        User user = userController.findByUsername(messageDTO.getUsername());
        User otherUser = userController.findByUsername(messageDTO.getOtherUsername());
        Iterable<MessageLog> allLogs = messageLogRepository.findAll();
        final MessageLog[] messageLog = new MessageLog[1];
        allLogs.forEach(item -> {
            if (item.getUser1().getId() == user.getId() && item.getUser2().getId() == otherUser.getId() ||
                item.getUser1().getId() == otherUser.getId() && item.getUser2().getId() == user.getId()) {
                messageLog[0] = item;
            }
        });
        MessageLog fetchedMessageLog = messageLog[0];
        Message message = new Message(messageDTO.getMessage(), user, fetchedMessageLog);
        messageRepository.save(message);
        return ResponseEntity.ok("Message created successfully");
    }

    @PostMapping("/createLog")
    public ResponseEntity<String> createMessageLog (Authentication authentication, @RequestBody MessageLogDTO messageLogDTO) {
        User activeUser = returnUserFromToken(authentication);
        User receivingUser = returnUserFromUsername(messageLogDTO.getUser());
        messageLogRepository.save(new MessageLog(activeUser, receivingUser));
        return ResponseEntity.ok("Message Log Created");
    }

    @GetMapping("/read/{username}!{otherUsername}")
    public ResponseEntity<List<Message>> readMessageLog (Authentication authentication,@PathVariable String username, @PathVariable String otherUsername) {
        User user = userController.findByUsername(username);
        User otherUser = userController.findByUsername(otherUsername);
        Iterable<MessageLog> allLogs = messageLogRepository.findAll();
        final MessageLog[] messageLog = new MessageLog[1];
        allLogs.forEach(item -> {
            if (item.getUser1().getId() == user.getId() && item.getUser2().getId() == otherUser.getId() ||
                    item.getUser1().getId() == otherUser.getId() && item.getUser2().getId() == user.getId()) {
                messageLog[0] = item;
            }
        });
        MessageLog fetchedMessageLog = messageLog[0];
        List<Message> messages = new ArrayList<>();
        Iterable<Message> allMessages = messageRepository.findAll();
        allMessages.forEach(item -> {
            if (item.getMessageLog().getId() == fetchedMessageLog.getId()) {
                messages.add(item);
            }
        });
       return ResponseEntity.ok(messages);
    }

    @GetMapping("/readLogs")
    public ResponseEntity<List<MessageLog>> readAllMessageLogs (Authentication authentication) {
        User data = returnUserFromToken(authentication);
        Iterable<MessageLog> allLogs = messageLogRepository.findAll();
        List<MessageLog> output = new ArrayList<>();
        allLogs.forEach(item -> {
            if (item.getUser1().getId() == data.getId() || item.getUser2().getId() == data.getId()) {
                output.add(item);
            }
        });
        return ResponseEntity.ok(output);
    }

    @GetMapping("/getUser")
    public ResponseEntity<String> readActiveUser (Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(userController.findByUsername(username).getUsername());
    }

    @GetMapping("/readMessages")
    public ResponseEntity<List<Message>> readMessages (Authentication authentication, @RequestBody ReadMessageLogDTO readMessageLogDTO) {
        User user = userController.findByUsername(readMessageLogDTO.getUser());
        User otherUser = userController.findByUsername(readMessageLogDTO.getOtherUser());
        Iterable<MessageLog> allLogs = messageLogRepository.findAll();
        final MessageLog[] messageLog = new MessageLog[1];
        allLogs.forEach(item -> {
            if (item.getUser1().getId() == user.getId() && item.getUser2().getId() == otherUser.getId() ||
                    item.getUser1().getId() == otherUser.getId() && item.getUser2().getId() == user.getId()) {
                messageLog[0] = item;
            }
        });
        MessageLog fetchedMessageLog = messageLog[0];
        List<Message> messages = new ArrayList<>();
        Iterable<Message> allMessages = messageRepository.findAll();
        allMessages.forEach(item -> {
            if (item.getMessageLog().getId() == fetchedMessageLog.getId()) {
                messages.add(item);
            }
        });
        return ResponseEntity.ok(messages);
    }


        @DeleteMapping("/deleteLog")
    public ResponseEntity<String> deleteMessageLog(Authentication authentication) {
        String username = authentication.getName();
        User activeUser = userController.findByUsername(username);

        return ResponseEntity.ok("ok");
    }

    public User returnUserFromToken(Authentication authentication){
        String username = authentication.getName();
        return userController.findByUsername(username);
    }

    public User returnUserFromUsername(String username) {
        return userController.findByUsername(username);
    }

    public MessageLog returnLogFromTwoUsernames(String user1, String user2) {
        Iterable<MessageLog> allLogs = messageLogRepository.findAll();
        final MessageLog[] output = new MessageLog[1];
        allLogs.forEach((item) -> {
            if (item.getUser1().getUsername().equals(user1) && item.getUser2().getUsername().equals(user2) ||
                item.getUser1().getUsername().equals(user2) && item.getUser2().getUsername().equals(user1)) {
                output[0] = item;
            }
        });
        return output[0];
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



}
