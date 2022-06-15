package com.oms.ompass_demo_backend.domain.user.service;

import com.oms.ompass_demo_backend.domain.ompass.service.OmpassService;
import com.oms.ompass_demo_backend.domain.user.entity.User;
import com.oms.ompass_demo_backend.domain.user.model.SignupRequest;
import com.oms.ompass_demo_backend.domain.user.model.UserResponse;
import com.oms.ompass_demo_backend.domain.user.repository.UserRepository;
import com.oms.ompass_demo_backend.global.exception.AlreadyExistUserIdException;
import io.jsonwebtoken.Claims;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final OmpassService callOmpassAPI;

    @Transactional(readOnly = true)
    public boolean isExistUserId(String userId) {
        return userRepository.existsByUserId(userId);
    }

    @Transactional
    public UserResponse signup(SignupRequest request) {
        if (isExistUserId(request.getUserId())) {
            log.error("User ID that already exists");
            throw new AlreadyExistUserIdException();
        }

        User user = SignupRequest.toEntity(request);
        return UserResponse.from(userRepository.save(user));
    }

    @Transactional
    public void initUser(String userId, String newPassword) {
        User user = userRepository.findOneByUserId(userId).orElseThrow();
        user.changePassword(newPassword);
        callOmpassAPI.deleteRegisteredOmpass(userId);
    }

    public boolean verifyEmailToken(String userId, Claims payload) {
        if (payload.containsKey("user_id")) {
            String parsedUserId = (String) payload.get("user_id");
            return userId.equals(parsedUserId);
        }

        return false;
    }
}
