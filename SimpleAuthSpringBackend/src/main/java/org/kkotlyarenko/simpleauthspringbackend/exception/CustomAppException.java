package org.kkotlyarenko.simpleauthspringbackend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CustomAppException extends RuntimeException {
  private final HttpStatus status;

  public CustomAppException(String message, HttpStatus status) {
    super(message);
    this.status = status;
  }
}
