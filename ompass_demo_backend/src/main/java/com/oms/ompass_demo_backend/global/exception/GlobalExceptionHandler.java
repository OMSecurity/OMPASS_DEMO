package com.oms.ompass_demo_backend.global.exception;




import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.ConnectException;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    protected ResponseEntity<?> HttpMessageNotReadableException(HttpMessageNotReadableException e) {
        log.info("HttpMessageNotReadableException : {}", e.getMessage());
        return new ErrorResponse(HttpStatus.BAD_REQUEST, ErrorCode.ERR_003).send();
    }

    @ExceptionHandler(AlreadyExistUserIdException.class)
    protected ResponseEntity<?> AlreadyExistUserIdException(AlreadyExistUserIdException e) {
        log.error("AlreadyExistUserIdException : {}", e.errorCode.getMessage());
        return new ErrorResponse(HttpStatus.BAD_REQUEST, e.errorCode).send();
    }

    @ExceptionHandler(NotFoundException.class)
    protected ResponseEntity<?> notFoundException(NotFoundException e) {
        log.error("NotFoundException : {}", e.errorCode.getMessage());
        return new ErrorResponse(HttpStatus.NOT_FOUND, e.errorCode).send();
    }

    @ExceptionHandler(FailLoginException.class)
    protected ResponseEntity<?> FailLoginException(FailLoginException e) {
        log.error("FailLoginException : {}", e.errorCode.getMessage());
        return new ErrorResponse(HttpStatus.UNAUTHORIZED, e.errorCode).send();
    }


}
