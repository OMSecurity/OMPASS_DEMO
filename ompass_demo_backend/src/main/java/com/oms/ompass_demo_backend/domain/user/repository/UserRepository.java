package com.oms.ompass_demo_backend.domain.user.repository;

import com.oms.ompass_demo_backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByUserId(String userId);

    boolean existsByUserId(String userId);
}
