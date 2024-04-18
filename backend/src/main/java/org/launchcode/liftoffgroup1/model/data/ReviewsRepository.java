package org.launchcode.liftoffgroup1.model.data;

import org.launchcode.liftoffgroup1.model.Review;
import org.launchcode.liftoffgroup1.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewsRepository extends CrudRepository<Review, String> {
    public List<Review> findAllByUserEquals(User user);

}
