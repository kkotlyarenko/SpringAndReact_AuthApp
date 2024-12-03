package org.kkotlyarenko.simpleauthspringbackend.util;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.kkotlyarenko.simpleauthspringbackend.config.JwtTokenProvider;
import org.kkotlyarenko.simpleauthspringbackend.entity.User;
import org.kkotlyarenko.simpleauthspringbackend.exception.CustomAppException;
import org.kkotlyarenko.simpleauthspringbackend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtUtils {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    public User getUserFromRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new CustomAppException("Invalid Authorization header", HttpStatus.BAD_REQUEST);
        }

        token = token.substring(7);
        jwtTokenProvider.validateToken(token);
        Long userId = jwtTokenProvider.getIdFromJWT(token);
        return userService.findById(userId);
    }
}
