package com.oms.ompass_demo_backend.domain.user.controller;

import com.oms.ompass_demo_backend.domain.user.model.EmailTokenVerificationRequest;
import com.oms.ompass_demo_backend.domain.user.model.InitUserRequest;
import com.oms.ompass_demo_backend.domain.user.model.SignupRequest;
import com.oms.ompass_demo_backend.global.MailService;
import com.oms.ompass_demo_backend.domain.user.service.UserService;
import com.oms.ompass_demo_backend.global.jwt.JwtService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@Slf4j
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/auth")
public class UserController {

    private final UserService userService;

    private final MailService mailService;

    private final JwtService jwtService;

    /**
     * Inquire about the existence of a user ID
     * @param userId : user ID
     * @return : existence
     */
    @GetMapping(value = "/users")
    public ResponseEntity<?> checkDuplicateUserId(@RequestParam(value = "userId") String userId) {
        return new ResponseEntity<>(userService.isExistUserId(userId), HttpStatus.OK);
    }

    /**
     * Registration
     * @param request : required information for registration
     * @return : the registered user information
     */
    @PostMapping(value = "/users")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupRequest request) {
        return new ResponseEntity<>(userService.signup(request), HttpStatus.CREATED);
    }

    /**
     * Sending email to reset user's password and OMPASS registration
     * @param userId : user ID
     * @param lang : language of the email to be sent
     */
    @GetMapping(value = "/users/mail")
    public ResponseEntity<?> sendMail(@RequestParam(value = "userId") String userId,
                                      @RequestParam(value = "lang") String lang) throws IOException, MessagingException {
        mailService.mailSend(userId, lang);
        log.info("Complete sending email");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * API to validate the email access token from a verification email
     * @param request : user ID and email access token
     * @return : token validation result
     */
    @PostMapping(value = "/users/mail/token-verification")
    public ResponseEntity<?> verifyEmailToken(@RequestBody @Valid EmailTokenVerificationRequest request, HttpServletResponse response) {
        Claims payload = jwtService.checkMailJwt(request.getToken());
        if (userService.verifyEmailToken(request.getUserId(), payload)) {
            response.setHeader("Authorization", jwtService.create("user_init", "user_id", request.getUserId()));
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Resetting the user's password and OMPASS registration.
     * @param userId : user ID
     * @param request : new password
     */
    @PutMapping(value = "/users/init")
    public ResponseEntity<?> init(@RequestParam(value = "userId") String userId,
                                  @RequestBody InitUserRequest request) {
        userService.initUser(userId, request.getNewPassword());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
