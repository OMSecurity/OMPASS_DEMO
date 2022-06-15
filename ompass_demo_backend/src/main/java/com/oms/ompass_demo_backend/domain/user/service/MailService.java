package com.oms.ompass_demo_backend.domain.user.service;

import com.oms.ompass_demo_backend.domain.user.repository.UserRepository;
import com.oms.ompass_demo_backend.global.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.*;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

    @Value("${ompass.rp.fqdn}")
    private String fqdn;

    private final JavaMailSender mailSender;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final ResourceLoader resourceLoader;

    public void mailSend(String userId, String language) throws IOException, MessagingException {
        String receivingAddress = userRepository.findOneByUserId(userId).orElseThrow().getEmail();
        log.info("receiver address : {}", receivingAddress);
        if (receivingAddress != null) {

            String token = jwtService.create("EMAIL_AUTH", "user_id", userId);
            URL authURL = new URL(fqdn + "/auth?id=" + userId + "&token=" + token);
            log.info("authURL : {}", authURL.toString());

            String mailTitle;
            if (language.equalsIgnoreCase("ko") || language.equalsIgnoreCase("kr")) {
                 mailTitle = "OMPASS RP 초기화 인증 메일입니다.";
            } else {
                mailTitle = "This is the OMPASS RP initialization verification email.";
            }


            String body = getEmailTemplate(language).replace("$AUTH_URL$", authURL.toString());
            MimeMessage email = mailSender.createMimeMessage();
            email.addRecipients(MimeMessage.RecipientType.TO, receivingAddress);
            email.setSubject(mailTitle);
            email.setText(body, "UTF-8", "html");
            mailSender.send(email);
        }
    }

    private String getEmailTemplate(String language) throws IOException {
        StringBuilder sb = new StringBuilder();

        InputStream inputStream;

        if (language.equalsIgnoreCase("ko") || language.equalsIgnoreCase("kr")) {
            inputStream = resourceLoader.getResource("classpath:email_template_kr.html").getInputStream();
        } else {
            inputStream = resourceLoader.getResource("classpath:email_template_en.html").getInputStream();
        }

        File file = File.createTempFile("file", ".tmp");
        IOUtils.copy(inputStream, new FileOutputStream(file, false));

        FileInputStream input = new FileInputStream(file);
        InputStreamReader reader = new InputStreamReader(input, StandardCharsets.UTF_8);
        BufferedReader br = new BufferedReader(reader);

        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }

        return sb.toString();
    }
}
