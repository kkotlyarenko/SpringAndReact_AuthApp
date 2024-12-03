package org.kkotlyarenko.simpleauthspringbackend.service;

import lombok.RequiredArgsConstructor;
import org.kkotlyarenko.simpleauthspringbackend.config.JwtTokenProvider;
import org.kkotlyarenko.simpleauthspringbackend.dto.response.AuthResponse;
import org.kkotlyarenko.simpleauthspringbackend.entity.User;
import org.kkotlyarenko.simpleauthspringbackend.exception.CustomAppException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthResponse authenticate(String username, String password) {
        User user = userService.findByUsername(username);
        if (userService.checkPassword(password, user.getPassword())) {
            String token = jwtTokenProvider.generateToken(user.getId());
            return new AuthResponse(token);
        } else {
            throw new CustomAppException("Incorrect username or password", HttpStatus.UNAUTHORIZED);
        }
    }

    public void register(String username, String password) {
        if (userService.existsByUsername(username)) {
            throw new CustomAppException("User with this username already exists", HttpStatus.BAD_REQUEST);
        }
        if (username.length() < 3) {
            throw new CustomAppException("Username length must be more than 3 characters", HttpStatus.BAD_REQUEST);
        }
        if (password.length() < 4) {
            throw new CustomAppException("Password length must be more than 4 characters", HttpStatus.BAD_REQUEST);
        }
        userService.save(new User(username, password));
    }
}
