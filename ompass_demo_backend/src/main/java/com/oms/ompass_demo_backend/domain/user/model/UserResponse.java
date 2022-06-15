package com.oms.ompass_demo_backend.domain.user.model;

import com.oms.ompass_demo_backend.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserResponse {
    private final Long id;
    private final String userId;
    private final String name;
    private final String email;

    @Builder
    private UserResponse(Long id, String userId, String name, String email) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }
}
