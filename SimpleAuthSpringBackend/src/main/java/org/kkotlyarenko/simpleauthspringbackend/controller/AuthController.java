package org.kkotlyarenko.simpleauthspringbackend.controller;

import lombok.RequiredArgsConstructor;
import org.kkotlyarenko.simpleauthspringbackend.dto.request.AuthRequest;
import org.kkotlyarenko.simpleauthspringbackend.dto.response.AuthResponse;
import org.kkotlyarenko.simpleauthspringbackend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        AuthResponse authResponse = authService.authenticate(authRequest.getUsername(), authRequest.getPassword());
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest authRequest) {
        authService.register(authRequest.getUsername(), authRequest.getPassword());
        return ResponseEntity.ok(authService.authenticate(authRequest.getUsername(), authRequest.getPassword()));
    }
}
