package com.oms.ompass_demo_backend.global.jwt;


public class JwtProperties {

    // SECRET : JWT SECRET KEY
    public static final String JWT_HEADER_STRING = "Authorization";

    public static final String JWT_HEADER_MAIL = "MailToken";

    // Expiry time for JWT is 10 minutes.
    public static final int JWT_ACCESS_TIME = 600000;

    // Expiry time for email is 5 minutes.
    public static final int JWT_MAIL_ACCESS_TIME = 300000;

}
