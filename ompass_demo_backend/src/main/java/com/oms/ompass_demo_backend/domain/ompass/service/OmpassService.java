package com.oms.ompass_demo_backend.domain.ompass.service;

import com.oms.ompass_demo_backend.domain.login.model.LastLoginProcessRequest;
import com.oms.ompass_demo_backend.domain.ompass.model.OmpassTokenVerification;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.annotation.PostConstruct;

@Slf4j
@Service
public class OmpassService {

    private WebClient webClient;

    @Value("${ompass.secret.key}")
    private String secretKey;

    @PostConstruct
    public void init() {
        webClient = WebClient.builder()
                .baseUrl("https://interface-api.ompasscloud.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, String.valueOf(MediaType.APPLICATION_JSON))
                .defaultHeader("Authorization", "Bearer " + secretKey)
                .build();
    }

    public String getOmpassUriForU2F(String userId, String lang) {
        JSONObject requestBody = new JSONObject();
        requestBody.put("user_id", userId);
        requestBody.put("lang_init", lang);

        String response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/ompass/u2f")
                        .build()
                )
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody.toString())
                .retrieve()
                .bodyToMono(String.class)
                .block();
        log.info("response : {}", response);

        JSONObject result = new JSONObject(response);
        return result.getJSONObject("data").getString("ompass_uri");
    }

    public String getOmpassUriForUAF(String lang) {
        JSONObject requestBody = new JSONObject();
        requestBody.put("lang_init", lang);

        String response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/ompass/uaf")
                        .build()
                )
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody.toString())
                .retrieve()
                .bodyToMono(String.class)
                .block();
        log.info("response : {}", response);

        JSONObject result = new JSONObject(response);
        return result.getJSONObject("data").getString("ompass_uri");
    }

    public boolean verifyOmpassToken(String userId, String accessToken) {
        JSONObject requestData = new JSONObject()
                .put("user_id", userId)
                .put("access_token", accessToken);

        log.info("user id : {}, token : {}", userId, accessToken);
        String response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/ompass/token-verification")
                        .build()
                )
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(requestData.toString())
                .retrieve()
                .bodyToMono(String.class)
                .block();

        log.info("VERIFY  OMPASS TOKEN : {}", response);
        JSONObject result = new JSONObject(response);
        int code = result.getInt("code");
        return code == 200;
    }

    public void deleteRegisteredOmpass(String userId) {
        webClient.delete()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/ompass/users/{userId}")
                        .build(userId)
                )
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

}
