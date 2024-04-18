package org.launchcode.liftoffgroup1.model.data;

import org.launchcode.liftoffgroup1.model.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends CrudRepository<Message, Integer> {
}
