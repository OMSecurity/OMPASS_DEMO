package com.oms.ompass_demo_backend.domain.login.model;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class LoginByU2fRequest {

    @NotBlank(message = "Please enter your ID")
    private String userId;

    @NotBlank(message = "Please enter your password")
    private String password;

    @NotBlank(message = "Please enter your lang")
    private String lang;
}
