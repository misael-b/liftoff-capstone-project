package org.launchcode.liftoffgroup1.model.data;

import org.launchcode.liftoffgroup1.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
