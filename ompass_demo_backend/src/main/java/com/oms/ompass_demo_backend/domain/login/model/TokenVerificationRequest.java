package com.oms.ompass_demo_backend.domain.login.model;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class TokenVerificationRequest {

    @NotBlank(message = "Please enter your ID")
    private String userId;

    @NotBlank(message = "Please enter your ompass access token")
    private String accessToken;

}
