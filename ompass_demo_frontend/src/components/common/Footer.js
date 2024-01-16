import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import "../css/footer.css";

const Footer = () => {
  const [setLang] = useState("ko");
  const { i18n } = useTranslation();

  useEffect(() => {
    const nowLang = localStorage.getItem("lang");

    if (nowLang === null || nowLang === "ko") {
      document.getElementById("eng").style.color = "#000";
      document.getElementById("ko").style.color = "#1e88e5";
      i18n.changeLanguage("ko");
    } else {
      document.getElementById("eng").style.color = "#1e88e5";
      document.getElementById("ko").style.color = "#000";
      i18n.changeLanguage("en");
    }
  }, []);

  const selectEng = () => {
    localStorage.setItem("lang", "eng");
    setLang("eng");
    document.getElementById("eng").style.color = "#1e88e5";
    document.getElementById("ko").style.color = "#000";
    i18n.changeLanguage("en");
  };
  const selectKo = () => {
    i18n.changeLanguage("ko");
    localStorage.setItem("lang", "ko");
    setLang("ko");
    document.getElementById("eng").style.color = "#000";
    document.getElementById("ko").style.color = "#1e88e5";
  };

  return (
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
  );
};

export default Footer;
