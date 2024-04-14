package org.launchcode.liftoffgroup1.model.data;

import org.launchcode.liftoffgroup1.model.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role, Integer> {
    Optional<Role> findByName(String name);

}
