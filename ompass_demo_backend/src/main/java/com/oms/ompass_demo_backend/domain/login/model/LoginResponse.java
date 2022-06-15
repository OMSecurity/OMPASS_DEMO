package com.oms.ompass_demo_backend.domain.login.model;

import com.oms.ompass_demo_backend.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginResponse {
    private final String userId;
    private final String name;
    private final String mail;

    @Builder
    private LoginResponse(String userId, String name, String mail) {
        this.userId = userId;
        this.name = name;
        this.mail = mail;
    }

    public static LoginResponse from(User user) {
        return LoginResponse.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .mail(user.getEmail())
                .build();
    }
}
