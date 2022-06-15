package com.oms.ompass_demo_backend.global.jwt;

import io.jsonwebtoken.Claims;

public interface JwtService {
	<T> String create(String subject, String key, T data);
	Claims getPayload();
	boolean isVerifyToken(String jwt);
	public Claims checkMailJwt(String jwt);
}
