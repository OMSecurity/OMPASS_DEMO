package com.oms.ompass_demo_backend.global.interceptor;

import com.oms.ompass_demo_backend.global.jwt.JwtProperties;
import com.oms.ompass_demo_backend.global.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Component
@RequiredArgsConstructor
public class MailAuthInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String jwtToken = request.getHeader(JwtProperties.JWT_HEADER_MAIL);
        log.info("preHandle Mail jwtToken : {}" ,jwtToken);
        if (jwtToken != null && jwtService.isVerifyToken(jwtToken)) {
            log.info("Mail JWT 검증 성공!");
            return true;
        } else {
            response.sendError(401,"MAil JWT 검증 싪패");
            log.error("Mail JWT 검증 실패!");
            return false;
        }
    }
}
