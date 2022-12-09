package com.oms.ompass_demo_backend.domain.login.controller;

import com.oms.ompass_demo_backend.domain.login.model.*;
import com.oms.ompass_demo_backend.domain.login.service.LoginService;
import com.oms.ompass_demo_backend.global.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@Slf4j
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/auth")
public class LoginController {

    private final LoginService loginService;

    private final JwtService jwtService;

    /**
     * This is a login API to which OMPASS's secondary authentication is applied. (Step 1)
     *
     * @param request : user ID, password, and the language of the OMPASS registration and authentication page
     * @return : OMPASS URI (Invoked by passing the URI to the frontend)
     */
    @PostMapping(value = "/login/u2f")
    public ResponseEntity<?> loginByU2F(@RequestBody @Valid LoginByU2fRequest request) {
        return new ResponseEntity<>(loginService.loginByU2F(request), HttpStatus.OK);
    }

    /**
     * This is an API that allows you to log in without a password with OMPASS. (Step 1)
     *
     * @param request : language of the OMPASS registration and authentication page
     * @return : OMPASS URI (Invoked by passing the URI to the frontend)
     */
    @PostMapping(value = "/login/uaf")
    public ResponseEntity<?> loginByUAF(@RequestBody LoginByUafRequest request) {
        return new ResponseEntity<>(loginService.loginByUAF(request), HttpStatus.OK);
    }

    /**
     * Validate the access token redirected to the redirect url of the designated application after completing OMPASS registration and authentication (Step 2)
     *
     * @param request : user ID and redirected access token
     * @return : user information for successful login
     */
    @PostMapping(value = "/ompass/token-verification")
    public ResponseEntity<?> tokenVerification(@RequestBody TokenVerificationRequest request, HttpServletResponse response) {
        LoginResponse user = loginService.verifyOmpassToken(request);
        String loginAccessToken = jwtService.create("demo", "userInfo", user);
        response.setHeader("Authorization", "Bearer " + loginAccessToken);
        // omit refresh token
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
