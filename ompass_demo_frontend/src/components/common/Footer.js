import React, { useEffect, useState } from "react";

import styled from "styled-components";
import Responsive from "./Responsive";
import { useTranslation } from "react-i18next";
import "../css/footer.css";

// const FooterBlock = styled.div`
//   width: 100%;
//   padding: 20px 0;
//   text-align: center;
// `;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이에 여백을 최대로 설정 */
`;

const Footer = () => {
  const [lang, setLang] = useState("ko");
  const { t, i18n } = useTranslation();

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
