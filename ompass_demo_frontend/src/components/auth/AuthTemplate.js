import React, {useEffect, useState} from "react";
import MainContent from "../content/MainContent";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import {Link} from "react-router-dom";

import "../css/loginPage.css";
import bg from "../../static/img/bg.mp4";
import backBg from "../../static/img/backBg.png";
import box from "../../static/img/ompass-bx.png";
import ttaCert from "../../static/img/img_8.png";
import fidoCert from "../../static/img/img_9.png";
import boxEn from "../../static/img/ompassEn.png";

import ompassEnBg from "../../static/img/ompassEnBg.png";
import ompassKo from "../../static/img/ompassKo.png";
import {useTranslation} from "react-i18next";
import phone from "../../static/img/phone.png";


const AuthTemplate = (props) => {
    const [lang, setLang] = useState("ko");
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const nowLang = localStorage.getItem("lang");
        if (nowLang === null || nowLang === "ko") {
            document.getElementById("eng").style.color = "#000";
            document.getElementById("ko").style.color = "#1e88e5";
            i18n.changeLanguage("ko");

            document.getElementById("enbg").style.display = "none";
            document.getElementById("kobg").style.display = "block";
        } else {
            document.getElementById("eng").style.color = "#1e88e5";
            document.getElementById("ko").style.color = "#000";
            i18n.changeLanguage("en");
            document.getElementById("enbg").style.display = "block";
            document.getElementById("kobg").style.display = "none";
        }
    }, []);

    const selectEng = () => {
        localStorage.setItem("lang", "eng");
        setLang("eng");
        document.getElementById("eng").style.color = "#1e88e5";
        document.getElementById("ko").style.color = "#000";
        i18n.changeLanguage("en");
        document.getElementById("enbg").style.display = "block";
        document.getElementById("kobg").style.display = "none";

        document.getElementById("enbg").style.display = "block";
        document.getElementById("kobg").style.display = "none";
    };
    const selectKo = () => {
        i18n.changeLanguage("ko");
        localStorage.setItem("lang", "ko");
        setLang("ko");
        document.getElementById("eng").style.color = "#000";
        document.getElementById("ko").style.color = "#1e88e5";

        document.getElementById("enbg").style.display = "none";
        document.getElementById("kobg").style.display = "block";
    };
    return (
        <div id="auth-wrapper">
            <div className="loginBox">
                <ul className="loginbox2">
                    <div id="auth-contents-wrapper">
                        <div className="login">
                            <div id="login-box">{props.children}</div>
                        </div>
                    </div>
                </ul>
                <ul>
                    <h2 className="title">
                        <b style={{color: "rgb(0 125 219)"}}>"{t("OMPASS")}" </b> <br/>{" "}
                        {t("OMPASSText")}
                    </h2>
                    <img className="ompassKo phone-img" id="kobg" src={ompassKo}/>
                    <img className="ompassKo phone-img" id="enbg" src={ompassEnBg}/>
                </ul>
            </div>

            <div className="bottom">
                <div id="selectLang">
                    <button className="lang-btn" id="eng" onClick={selectEng}>
                        EN
                    </button>
                    <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <button className="lang-btn" id="ko" onClick={selectKo}>
                        KO
                    </button>
                </div>
                <p className="copy">
                    <strong>Copyright © OneMoreSecurity Inc.</strong> All Rights Reserved.
                </p>
            </div>
        </div>
    );
};

export default AuthTemplate;
