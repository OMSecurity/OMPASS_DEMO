package com.oms.ompass_demo_backend.domain.user.model;

import com.oms.ompass_demo_backend.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class SignupRequest {

    @NotBlank(message = "Please enter your ID")
    private String userId;

    @NotBlank(message = "Please enter your password")
    private String password;

    @NotNull
    @NotBlank(message = "Please enter your name")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Please enter your email address")
    private String email;

    public static User toEntity(SignupRequest request) {
        return User.builder()
                .userId(request.getUserId())
                .password(request.getPassword())
                .name(request.getName())
                .email(request.getEmail())
                .build();
    }
}
