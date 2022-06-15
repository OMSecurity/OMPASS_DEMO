package com.oms.ompass_demo_backend.global.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.UNAUTHORIZED)
public class AlreadyExistUserIdException extends RuntimeException{

    ErrorCode errorCode = ErrorCode.ERR_002;




}
