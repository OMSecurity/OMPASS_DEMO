package com.oms.ompass_demo_backend.global.jwt;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Service
public class JwtServiceImpl implements JwtService {
    private static final String SALT = "oms_fido2";
    @Override
    public <T> String create(String subject, String key, T data) {
		return Jwts.builder()
				.setHeaderParam("typ", "JWT")
				.setHeaderParam("regDate", new Date(System.currentTimeMillis()))
				.setSubject(subject)
                .setExpiration(new Date(System.currentTimeMillis() + JwtProperties.JWT_ACCESS_TIME))
				.claim(key, data)
				.signWith(SignatureAlgorithm.HS256, this.generateKey())
				.compact();
    }

    @Override
    public boolean isVerifyToken(String jwt) {
        try {
            Jws<Claims> claims =
                    Jwts.parser()
                            .setSigningKey(this.generateKey())
                            .parseClaimsJws(jwt);
            return true;
        } catch (ExpiredJwtException e) {
            log.error("만료된 토큰입니다. : {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("지원하지 않는 형식의 토큰입니다. : {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("JWT의 구성이 올바르지 않습니다. : {}", e.getMessage());
        } catch (SignatureException e) {
            log.error("기존 서명을 확인하지 못했습니다. : {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("잘못된 파라미터입니다. : {}", e.getMessage());
        }
        return false;
    }

    @Override
    public Claims getPayload() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String jwt = request.getHeader(JwtProperties.JWT_HEADER_STRING);
        Claims claims = null;
        try {
            claims = (Claims) Jwts.parser()
                    .setSigningKey(SALT.getBytes(StandardCharsets.UTF_8))
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("JWT payload parse error : {}", e.getMessage());
        }
      return claims;
    }

    private byte[] generateKey() {
        byte[] key = null;
        key = SALT.getBytes(StandardCharsets.UTF_8);
        return key;
    }

    @Override
    public Claims checkMailJwt(String jwt) {
        Claims claims = null;
        try {
            claims = (Claims) Jwts.parser()
                    .setSigningKey(SALT.getBytes(StandardCharsets.UTF_8))
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("JWT payload parse error : {}", e.getMessage());
        }

        return claims;
    }

}
