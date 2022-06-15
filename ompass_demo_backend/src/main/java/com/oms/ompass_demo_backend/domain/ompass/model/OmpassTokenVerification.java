package com.oms.ompass_demo_backend.domain.ompass.model;

import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class OmpassTokenVerification {

    @NotNull(message = "Enter the ID.")
    private String id;

    @NotNull(message = "Enter the OMPASS access token.")
    private String accessToken;
}
