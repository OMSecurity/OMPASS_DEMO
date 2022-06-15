package com.oms.ompass_demo_backend.domain.login.model;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class LastLoginProcessRequest {
    @NotNull(message = "Enter the ID.")
    private String id;

    @NotNull(message = "Enter the OMPASS access token.")
    private String accessToken;
}
