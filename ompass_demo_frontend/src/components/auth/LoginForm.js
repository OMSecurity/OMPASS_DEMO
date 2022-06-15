import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {Link, withRouter} from "react-router-dom";
import palette from "../../lib/styles/palette";
import APIService from "../../lib/API/APIService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

import {message, Tabs} from "antd";

import icon from "../../static/img/icon-lg.png";

import {INTERFACE_SERVER_URL} from "../../rest/Url";
import "../css/loginPage.css";
import {useTranslation} from "react-i18next";

export const FIDO2_REDIRECT_DOMAIN = window.location.origin.slice(8);


const {TabPane} = Tabs;

function callback(key) {
    console.log(key);
}

const AuthFormBlock = styled.div`
  h2 {
    color: ${palette.gray[8]};
    text-align: center;
  }
`;

const LoginFrom = ({history, props}) => {
    const {t, i18n} = useTranslation();
    // CustomHook
    const useInput = (initValue = null) => {
        const [value, setter] = useState(initValue);
        const handler = (e) => {
            setter(e.target.value);
        };
        return [value, handler];
    };
    let color = "#868e96";
    const [userId, onChangeUserId] = useInput("");
    const [password, onChangePassword] = useInput("");

    const [errorMsg, setErrorMsg] = useState("");

    const popupWidth = 800;
    const popupHeight = 500;
    const popupX = window.screen.width / 2 - popupWidth / 2;
    const popupY = window.screen.height / 2 - popupHeight / 2;

    let lang;

    useEffect(() => {
    }, []);

    // 일반 로그인 & 2차 인증 관련 메서드
    const goLogin = useCallback(
        async (e) => {
            e.preventDefault();
            let errorCheck = true;

            if (userId === "" || userId === null || userId === undefined) {
                setErrorMsg(t("enterId"));
                return false;
            }

            if (password === "" || password === null || password === undefined) {
                setErrorMsg(t("enterPw"));
                return false;
            }

            if (errorCheck) {
                await checkLang();
                const user = {userId, password, lang};
                console.log(user.lang);
                APIService.loginByU2F(user)
                    .then((res) => {
                        if (res.status === 200) {
                            setErrorMsg("");
                            let uri = res.data;
                            localStorage.setItem("u2f", "Y");
                            window.open(
                                uri,
                                "test",
                                `status = no width=800, height=500 ,left =${popupX}, top=${popupY}`
                            );
                        } else {
                            setErrorMsg(t("failLogin"))
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setErrorMsg(t("failLogin"))
                    });
            }
        },
        [userId, password]
    );

    const checkLang = () => {
        if (localStorage.getItem("lang") == null || localStorage.getItem("lang") === "ko") {
            lang = "KO";
        } else {
            lang = "EN";
        }
    };
    const onClick = () => {
        checkLang();
        APIService.loginByUAF(lang).then((res) => {
            let uri = res.data;
            window.open(
                uri,
                "test",
                `status = no width=800,height=500 ,left=${popupX}, top=${popupY}`
            );
        });
    };

    const sendMail = () => {
        let nowLang = localStorage.getItem("lang");
        if (nowLang === null) {
            nowLang = "ko";
        }
        const userId = prompt(t("enterId"));
        if (userId !== "") {
            APIService.idCheck(userId).then((res) => {
                if (res.data) {
                    alert(t("sendInitMail"));
                    APIService.sendMail(userId, nowLang).then((res) => {
                    });
                } else {
                    alert(t("wrongId"));
                }
            });
        } else {
            alert(t("enterId"));
        }
    };

    return (
        <AuthFormBlock>
            <div id="login-header">
                <Tabs
                    defaultActiveKey="1"
                    onChange={callback}
                    type="card"
                    size={"large"}
                >
                    <TabPane tab="ID/PW" key="1">
                        <div id="wrapper-login-form" className="longinForm">
                            <form>
                                <input
                                    className="underline"
                                    autoComplete="username"
                                    name="userId"
                                    placeholder="ID"
                                    onChange={onChangeUserId}
                                />
                                <input
                                    className="underline"
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    onChange={onChangePassword}
                                />

                                {errorMsg && (
                                    <p className="error-Msg">
                                        <FontAwesomeIcon icon={faExclamationCircle}/> &nbsp;
                                        {errorMsg}
                                    </p>
                                )}
                                <button id="loginBtn" onClick={goLogin}>
                                    {t("Login")}
                                </button>
                            </form>
                        </div>
                    </TabPane>

                    <TabPane tab="OMPASS" key="2">
                        <div id="ompass-login-wrapper" className="longinForm">
                            <div id="ompass-logo-wrapper">
                                <img src={icon} style={{width: "100px"}}/>
                            </div>
                            <div id="ompass-btn-wrapper">
                                <button id="ompassLoginBtn1" onClick={onClick}>
                                    {t("OMPASSLogin")}
                                </button>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
                <div id="login-footer">
                    {t("goRegister")}{" "}
                    <Link to="/register">
                        <span className="mySpan">{t("register")}</span>{" "}
                    </Link>{" "}
                    <br/>
                    {t("findPw")}{" "}
                    <Link onClick={sendMail}>
                        {" "}
                        <span className="mySpan" style={{marginLeft: "2px"}}>
              {t("resetPw")}{" "}
            </span>{" "}
                    </Link>
                </div>
            </div>
        </AuthFormBlock>
    );
};

export default withRouter(LoginFrom);
