package org.kkotlyarenko.simpleauthspringbackend.dto.response;

import lombok.Getter;

@Getter
public class StandartResponse {
    private final String details;

    public StandartResponse(String message) {
        this.details = message;
    }
}
