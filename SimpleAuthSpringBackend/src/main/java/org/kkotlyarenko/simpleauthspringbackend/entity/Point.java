package org.kkotlyarenko.simpleauthspringbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.kkotlyarenko.simpleauthspringbackend.dto.request.PointRequest;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "points")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_points_user"))
    private User user;

    @Column(nullable = false)
    private double x;

    @Column(nullable = false)
    private double y;

    @Column(nullable = false)
    private double r;

    @Column(nullable = false)
    private boolean hit;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime timestamp = LocalDateTime.now();

    public Point() {}

    public Point(User user, double x, double y, double r, boolean hit) {
        this.user = user;
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
    }

    public static Point fromPointRequest(User user, PointRequest pointRequest) {
        return new Point(
                user,
                pointRequest.getX(),
                pointRequest.getY(),
                pointRequest.getR(),
                checkHit(pointRequest.getX(), pointRequest.getY(), pointRequest.getR())
        );
    }

    private static boolean checkHit(double x, double y, double r) {
        if (x <= 0 && y >= 0) {
            return x >= -r && y <= r;
        } else if (x >= 0 && y <= 0) {
            return x * x + y * y <= r * r;
        } else if (x >= 0 && y >= 0) {
            return x <= r / 2 && y <= r && y <= r - 2 * x;
        }
        return false;
    }
}
