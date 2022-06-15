package com.oms.ompass_demo_backend.domain.user.model;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class EmailTokenVerificationRequest {
    @NotBlank(message = "Please enter your ID")
    private String userId;

    @NotBlank(message = "Please enter your email access token")
    private String token;
}
