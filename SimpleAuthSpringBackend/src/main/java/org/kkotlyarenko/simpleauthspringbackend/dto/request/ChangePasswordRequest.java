package org.kkotlyarenko.simpleauthspringbackend.dto.request;

import lombok.Getter;

@Getter
public class ChangePasswordRequest{
    private final String oldPassword;
    private final String newPassword;


    public ChangePasswordRequest(String oldPassword, String newPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
