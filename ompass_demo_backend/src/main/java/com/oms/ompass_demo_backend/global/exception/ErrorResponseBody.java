package com.oms.ompass_demo_backend.global.exception;

import lombok.Getter;

@Getter
public class ErrorResponseBody {
    private final String code;
    private final String message;

    public ErrorResponseBody(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
