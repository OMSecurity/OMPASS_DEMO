package com.oms.ompass_demo_backend.global.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ErrorResponse {

    private final String code;
    private final String message;
    @JsonIgnore
    private final HttpStatus httpStatus;

    public ErrorResponse(HttpStatus httpStatus, ErrorCode errorCode) {
        this.code = errorCode.getErrorCode();
        this.message = errorCode.getMessage();
        this.httpStatus = httpStatus;
    }

    public ResponseEntity<?> send() {
        ErrorResponseBody body = new ErrorResponseBody(this.code, this.message);
        return new ResponseEntity<>(body, this.httpStatus);
    }

    public String convertToJson() throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(this);
    }

}
