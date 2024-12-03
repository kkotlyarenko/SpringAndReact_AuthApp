package org.kkotlyarenko.simpleauthspringbackend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.kkotlyarenko.simpleauthspringbackend.dto.request.PointRequest;
import org.kkotlyarenko.simpleauthspringbackend.dto.response.ListPointsResponse;
import org.kkotlyarenko.simpleauthspringbackend.dto.response.PointResponse;
import org.kkotlyarenko.simpleauthspringbackend.dto.response.StandartResponse;
import org.kkotlyarenko.simpleauthspringbackend.entity.Point;
import org.kkotlyarenko.simpleauthspringbackend.entity.User;
import org.kkotlyarenko.simpleauthspringbackend.service.PointService;
import org.kkotlyarenko.simpleauthspringbackend.util.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/point")
@RequiredArgsConstructor
public class PointController {
    private final PointService pointService;
    private final JwtUtils jwtUtils;

    @Operation(summary = "Add point", security = @SecurityRequirement(name = "BearerAuth"))
    @PostMapping("/addPoint")
    public ResponseEntity<PointResponse> addPoint(@RequestBody PointRequest pointRequest, HttpServletRequest request) {
        User user = jwtUtils.getUserFromRequest(request);
        Point point = Point.fromPointRequest(user, pointRequest);
        Point savedPoint = pointService.addPoint(point, user.getId());
        return ResponseEntity.ok(PointResponse.fromPoint(savedPoint));
    }

    @Operation(summary = "Get points", security = @SecurityRequirement(name = "BearerAuth"))
    @GetMapping("/getPoints")
    public ResponseEntity<ListPointsResponse> getPoints(HttpServletRequest request) {
        User user = jwtUtils.getUserFromRequest(request);
        List<Point> points = pointService.getPoints(user.getId());
        return ResponseEntity.ok(new ListPointsResponse(points.stream().map(PointResponse::fromPoint).toList()));
    }

    @Operation(summary = "Delete point", security = @SecurityRequirement(name = "BearerAuth"))
    @DeleteMapping("/deletePoint/{id}")
    public ResponseEntity<StandartResponse> deletePoint(@PathVariable Long id, HttpServletRequest request) {
        User user = jwtUtils.getUserFromRequest(request);
        pointService.deletePoint(id, user.getId());
        return ResponseEntity.ok(new StandartResponse("Point deleted"));
    }
}
