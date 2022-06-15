package com.oms.ompass_demo_backend.domain.login.model;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class LoginByUafRequest {

    @NotBlank(message = "Please enter your lang")
    private String lang;
}
