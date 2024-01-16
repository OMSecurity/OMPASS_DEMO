import React, {useEffect} from "react";

import "../css/loginPage.css";

import ompassEnBg from "../../assets/img/ompassEnBg.png";
import ompassKo from "../../assets/img/ompassKo.png";
import {useTranslation} from "react-i18next";


const AuthTemplate = (props) => {
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
