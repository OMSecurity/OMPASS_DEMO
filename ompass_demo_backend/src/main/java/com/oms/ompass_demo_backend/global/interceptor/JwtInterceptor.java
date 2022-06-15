package com.oms.ompass_demo_backend.global.interceptor;


import com.oms.ompass_demo_backend.global.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("request uri : {}", request.getRequestURI());
        String jwt = request.getHeader("Authorization");
        log.info("jwt : {}", jwt);
        jwt = jwt.substring(7);
        if (jwtService.isVerifyToken(jwt)) {
            return true;
        } else {
            response.sendError(401, "JWT 검증 실패");
            return false;
        }
    }
}
