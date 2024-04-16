package org.launchcode.liftoffgroup1.controllers;


import org.launchcode.liftoffgroup1.model.Message;
import org.launchcode.liftoffgroup1.model.MessageLog;
import org.launchcode.liftoffgroup1.model.data.MessageLogRepository;
import org.launchcode.liftoffgroup1.model.data.MessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/message")
public class MessageController {

    private MessageRepository messageRepository;
    private MessageLogRepository messageLogRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createMessage (@RequestBody Message message) {
        messageRepository.save(message);
        return ResponseEntity.ok("Message created successfully");
    }

    @GetMapping("/read")
    public ResponseEntity<String> readMessageLog (/* Some way to identify users */) {

        return ResponseEntity.ok("ok");
    }

    @GetMapping("/readLogs")
    public ResponseEntity<Iterable<MessageLog>> readAllMessageLogs (/* grab user token and get username */) {
        return ResponseEntity.ok(messageLogRepository.findAll());
    }
    @PutMapping("/update")
    public ResponseEntity<String> updateMessage () {

        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMessage () {

        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("/deleteLog")
    public ResponseEntity<String> deleteMessageLog() {
        // this should require both users in the log to delete. store 2 bools in log database?
        return ResponseEntity.ok("ok");
    }


}
