package org.kkotlyarenko.simpleauthspringbackend.dto.response;

import lombok.Getter;
import org.kkotlyarenko.simpleauthspringbackend.entity.Point;

import java.time.ZoneOffset;

@Getter
public class PointResponse {
    private final Long id;
    private final Double x;
    private final Double y;
    private final Double r;
    private final boolean hit;
    private final Long timestamp;

    public PointResponse(Long id, Double x, Double y, Double r, boolean hit, Long timestamp) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.timestamp = timestamp;
    }

    public static PointResponse fromPoint(Point point) {
        return new PointResponse(
                point.getId(),
                point.getX(),
                point.getY(),
                point.getR(),
                point.isHit(),
                point.getTimestamp().toEpochSecond(ZoneOffset.UTC)
        );
    }
}
