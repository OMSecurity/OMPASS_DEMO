package com.oms.ompass_demo_backend.global.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    ERR_001("ERR_001", "Please check your ID and password."),
    ERR_002("ERR_002", "User ID that already exists."),
    ERR_003("ERR_003", "Invalid API request.");

    private final String errorCode;
    private final String message;

    ErrorCode(String errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }
}

