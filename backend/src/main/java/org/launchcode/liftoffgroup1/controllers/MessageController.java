package org.launchcode.liftoffgroup1.controllers;


import org.launchcode.liftoffgroup1.model.Message;
import org.launchcode.liftoffgroup1.model.MessageLog;
import org.launchcode.liftoffgroup1.model.data.MessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/message")
public class MessageController {

    private MessageRepository messageRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createMessage (@RequestBody Message message) {

    }

    @GetMapping("/read")
    public ResponseEntity<MessageLog> readMessageLog (/* Some way to identify user */) {

    }

    @PutMapping("/update")
    public ResponseEntity<String> updateMessage () {

    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMessage () {

    }

    @DeleteMapping("/deleteLog")
    public ResponseEntity<String> deleteMessageLog() {
        // this should require both users in the log to delete. store 2 bools in log database?
    }


}
