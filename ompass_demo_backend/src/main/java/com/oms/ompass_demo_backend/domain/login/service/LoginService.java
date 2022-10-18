package com.oms.ompass_demo_backend.domain.login.service;

import com.oms.ompass_demo_backend.domain.login.model.*;
import com.oms.ompass_demo_backend.domain.ompass.service.OmpassService;
import com.oms.ompass_demo_backend.domain.user.entity.User;
import com.oms.ompass_demo_backend.domain.user.repository.UserRepository;
import com.oms.ompass_demo_backend.global.exception.FailLoginException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    private final OmpassService callOmpassAPI;

    // 2FA auth login
    @Transactional(readOnly = true)
    public String loginByU2F(LoginByU2fRequest request) {
        User user = userRepository.findOneByUserId(request.getUserId())
                .orElseThrow(FailLoginException::new);

        // Step 1 : Verify the user's password.
        if (!user.isVerifyPassword(request.getPassword())) {
            throw new FailLoginException();
        }

        // Step 2 : Call OMPASS U2F API to get OMPASS URI as response value..
        return callOmpassAPI.getOmpassUriForU2F(request.getUserId(), request.getLang());
    }

    // password less login
    public String loginByUAF(LoginByUafRequest request) {
        return callOmpassAPI.getOmpassUriForUAF(request.getLang());
    }

    @Transactional(readOnly = true)
    public LoginResponse verifyOmpassToken(TokenVerificationRequest request) {
        // Call the OMPASS API to validate the redirected access token.
        if (!callOmpassAPI.verifyOmpassToken(request.getUserId(), request.getAccessToken())) {
            log.info("fail login - user id : {}", request.getUserId());
            throw new FailLoginException();
        }

        log.info("success login - user id : {}" , request.getUserId());
        User user = userRepository.findOneByUserId(request.getUserId()).orElseThrow();
        return LoginResponse.from(user);
    }
}
