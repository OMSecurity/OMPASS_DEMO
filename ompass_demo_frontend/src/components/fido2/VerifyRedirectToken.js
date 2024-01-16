import React, { useEffect } from 'react';
import APIService from "../../lib/API/APIService";
import { withRouter } from 'react-router-dom';
import qs from "qs";
import axios from "axios";
import { message } from "antd";
import { useTranslation } from "react-i18next";

const VerifyRedirectToken = ({ history, location }) => {

    const { t, i18n } = useTranslation()

    axios.defaults.headers.common["Authorization"] = localStorage.getItem('jwtToken');
    console.log(localStorage.getItem('jwtToken'));

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const userId = query.username;
    const accessToken = query.access_token;

    const verificationInfo = {
        userId, accessToken
    }

    useEffect(() => {
        const nowLang = localStorage.getItem("lang");
        if (nowLang === null || nowLang === "ko") {
            i18n.changeLanguage("ko");
        } else {
            i18n.changeLanguage("en");
        }
        APIService.verifyOmpassAccessToken(verificationInfo)
            .then(res => {
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem("isOmpassUser", 'Y');
                localStorage.setItem("userName", res.data.name);
                localStorage.setItem("temp", "Y");

                if (res.status === 200) {
                    message
                        .loading('OMPASS Login..', 0.3)
                        .then(() => {
                            console.log('here ????', localStorage.getItem("u2f"))
                            if (localStorage.getItem("u2f") === 'Y') {
                                message.success(t('successOmpass2fa'), 2);
                            } else {
                                message.success(t("successOmpassAuth"), 2);
                            }
                            history.push('/');
                        });
                } else {
                    alert("OMPASS 토큰 검증 실패")
                }

            })
    }, []);

    return <></>;

}
export default withRouter(VerifyRedirectToken);