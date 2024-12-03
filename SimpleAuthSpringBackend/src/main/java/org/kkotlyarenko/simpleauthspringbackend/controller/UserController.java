package org.kkotlyarenko.simpleauthspringbackend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.kkotlyarenko.simpleauthspringbackend.dto.response.UserResponse;
import org.kkotlyarenko.simpleauthspringbackend.dto.request.ChangePasswordRequest;
import org.kkotlyarenko.simpleauthspringbackend.dto.request.DeleteUserRequest;
import org.kkotlyarenko.simpleauthspringbackend.dto.response.StandartResponse;
import org.kkotlyarenko.simpleauthspringbackend.entity.User;
import org.kkotlyarenko.simpleauthspringbackend.service.PointService;
import org.kkotlyarenko.simpleauthspringbackend.service.UserService;
import org.kkotlyarenko.simpleauthspringbackend.util.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final PointService pointService;

    @Operation(summary = "Get user info", security = @SecurityRequirement(name = "BearerAuth"))
    @GetMapping("/getInfo")
    public ResponseEntity<UserResponse> getUserInfo(HttpServletRequest httpRequest) {
        User user = jwtUtils.getUserFromRequest(httpRequest);
        return ResponseEntity.ok(new UserResponse(user.getId(), user.getUsername()));
    }

    @Operation(summary = "Update user password", security = @SecurityRequirement(name = "BearerAuth"))
    @PostMapping("/updatePassword")
    public ResponseEntity<StandartResponse> updatePassword(@RequestBody ChangePasswordRequest request, HttpServletRequest httpRequest) {
        User user = jwtUtils.getUserFromRequest(httpRequest);
        userService.updatePassword(user, request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.ok(new StandartResponse("Password updated successfully"));
    }

    @Operation(summary = "Delete user", security = @SecurityRequirement(name = "BearerAuth"))
    @DeleteMapping("/deleteUser")
    public ResponseEntity<StandartResponse> deleteUser(@RequestBody DeleteUserRequest request, HttpServletRequest httpRequest) {
        User user = jwtUtils.getUserFromRequest(httpRequest);
        pointService.deleteAllPoints(user);
        userService.delete(user, request.getPassword());
        return ResponseEntity.ok(new StandartResponse("User deleted successfully"));
    }
}
