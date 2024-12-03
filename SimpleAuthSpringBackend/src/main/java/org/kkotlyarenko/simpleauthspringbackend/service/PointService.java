package org.kkotlyarenko.simpleauthspringbackend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.kkotlyarenko.simpleauthspringbackend.entity.Point;
import org.kkotlyarenko.simpleauthspringbackend.entity.User;
import org.kkotlyarenko.simpleauthspringbackend.exception.CustomAppException;
import org.kkotlyarenko.simpleauthspringbackend.repository.PointRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointRepository;
    private final UserService userService;

    public Point addPoint(Point point, Long userId) {
        User user = userService.findById(userId);
        point.setUser(user);
        return pointRepository.save(point);
    }

    public List<Point> getPoints(Long userId) {
        User user = userService.findById(userId);
        return pointRepository.findByUser(user, Sort.by(Sort.Direction.DESC, "timestamp"));
    }

    public void deletePoint(Long id, Long userId) {
        User user = userService.findById(userId);
        Point point = pointRepository.findById(id).orElseThrow(() -> new CustomAppException("Point not found", HttpStatus.NOT_FOUND));
        if (!point.getUser().getId().equals(user.getId())) {
            throw new CustomAppException("Point does not belong to the user", HttpStatus.FORBIDDEN);
        }
        pointRepository.delete(point);
    }

    @Transactional
    public void deleteAllPoints(User user) {
        pointRepository.deleteAllByUser(user);
    }
}
