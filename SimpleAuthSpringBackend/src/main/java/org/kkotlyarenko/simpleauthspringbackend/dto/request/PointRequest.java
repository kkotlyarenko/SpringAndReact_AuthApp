package org.kkotlyarenko.simpleauthspringbackend.dto.request;

import lombok.Getter;

@Getter
public class PointRequest {
    private final double x;
    private final double y;
    private final double r;

    public PointRequest(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}
