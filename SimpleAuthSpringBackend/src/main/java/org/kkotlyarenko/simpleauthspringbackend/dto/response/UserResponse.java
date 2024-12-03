package org.kkotlyarenko.simpleauthspringbackend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private final Long id;
    private final String username;

    public UserResponse(Long id, String username) {
        this.id = id;
        this.username = username;
    }
}
