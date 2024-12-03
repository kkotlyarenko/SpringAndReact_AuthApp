package org.kkotlyarenko.simpleauthspringbackend.dto.response;

import lombok.Getter;

@Getter
public class AuthResponse {
    private final String jwtToken;

    public AuthResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }

}
