package org.kkotlyarenko.simpleauthspringbackend.exception;

import org.kkotlyarenko.simpleauthspringbackend.dto.response.StandartResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CustomAppException.class)
    public ResponseEntity<StandartResponse> handleCustomException(CustomAppException e) {
        return ResponseEntity
                .status(e.getStatus())
                .body(new StandartResponse(e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandartResponse> handleGenericException(Exception e) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new StandartResponse("An unexpected error occurred: " + e.getMessage()));
    }
}
