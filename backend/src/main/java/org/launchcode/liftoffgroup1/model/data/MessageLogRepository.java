package org.launchcode.liftoffgroup1.model.data;

import org.launchcode.liftoffgroup1.model.MessageLog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageLogRepository extends CrudRepository<MessageLog, Integer> {
}
