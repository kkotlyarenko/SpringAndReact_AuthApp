package org.kkotlyarenko.simpleauthspringbackend.repository;

import org.kkotlyarenko.simpleauthspringbackend.entity.Point;
import org.kkotlyarenko.simpleauthspringbackend.entity.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {
    List<Point> findByUser(User user, Sort sort);
    void deleteAllByUser(User user);
}
