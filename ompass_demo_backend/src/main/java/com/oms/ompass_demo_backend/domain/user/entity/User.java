package com.oms.ompass_demo_backend.domain.user.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

import static com.oms.ompass_demo_backend.global.config.SecurityConfig.passwordEncoder;

@Getter
@Entity
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @CreatedDate
    @Column(updatable = false)
    protected LocalDateTime createdAt;

    @LastModifiedDate
    protected LocalDateTime updatedAt;

    @Builder
    public User(String userId, String password, String name, String email) {
        this.userId = userId;
        this.password = passwordEncoder.encode(password);
        this.name = name;
        this.email = email;
    }

    public boolean isVerifyPassword(String password) {
        return passwordEncoder.matches(password, this.password);
    }

    public void changePassword(String newPassword) {
        this.password = passwordEncoder.encode(newPassword);
    }

}
