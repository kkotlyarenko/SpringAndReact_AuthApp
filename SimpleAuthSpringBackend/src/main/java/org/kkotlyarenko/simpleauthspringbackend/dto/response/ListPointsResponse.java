package org.kkotlyarenko.simpleauthspringbackend.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class ListPointsResponse {
    private final List<PointResponse> points;

    public ListPointsResponse(List<PointResponse> points) {
        this.points = points;
    }
}
