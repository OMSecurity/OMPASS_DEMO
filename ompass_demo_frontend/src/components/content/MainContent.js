import React, { useEffect, useState } from "react";

import CommonTemplate from "../common/CommonTemplate";
import styled from "styled-components";
import {
  Carousel,
  Image,
  Avatar,
  Menu,
  Dropdown,
  Descriptions,
  message,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import Button from "../common/Button";
import { Timeline, Alert } from "antd";

import { useTranslation } from "react-i18next";
import APIService from "../../lib/API/APIService";
import { withRouter, Redirect } from "react-router-dom";
import "../css/mainPage.css";
import img from "../../static/img/monitor.png";
import ompassLoginImg from "../../static/img/ompass-tt.png";
import ompassLoginImgEn from "../../static/img/ompass-ttEnpng.png";


const { SubMenu } = Menu;

const MainContent = ({ history }) => {
  const { t, i18n } = useTranslation();

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [isOmpassUser, setIsOmpassUser] = useState("");
  const [is2FaUser, setIs2FaUser] = useState("");

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setIsOmpassUser(localStorage.getItem("isOmpassUser"));
    setIs2FaUser(localStorage.getItem("is2FaUser"));
    setUserName(localStorage.getItem("userName"));
  }, []);

  const registerFido = () => {
    APIService.getOmpassRegisterUri(userId).then((res) => {
      console.log(res);
      let uri = res.data;
      const popupWidth = 800;
      const popupHeight = 500;
      const popupX = window.screen.width / 2 - popupWidth / 2;
      const popupY = window.screen.height / 2 - popupHeight / 2;
      window.open(
        uri,
        "test",
        `status = no width=800,height=500 ,left =${popupX}, top=${popupY}`
      );
    });
  };

  const updateSecCert = () => {
    console.log("updateSecCert");
    APIService.updateSecCert(userId).then((res) => {
      if (res.data === "success") {
        localStorage.setItem("2faTemp", "Y");
        history.push("/");
      } else {
        alert(t("tryAgain"));
      }
    });
  };

  const cancel2Fa = () => {
    APIService.cancel2Fa(userId).then((res) => {
      localStorage.setItem("2faTemp", "N");
      history.push("/");
    });
  };
  // const [lang, setLang] = useState("ko");
  const nowLang = localStorage.getItem("lang");
  return (
    <div id="mainContent">
      {localStorage.getItem("userId") ? (
        <>
          <ul id="show-authentication-method">
            {localStorage.getItem("temp") === "Y" ? (
              <>
                {nowLang === "eng" ? (
                  <img className="method" src={ompassLoginImgEn} />
                ) : (
                  <img className="method" src={ompassLoginImg} />
                )}
              </>
            ) : (
              <img className="method" src={img} />
            )}
          </ul>

          <ul id="show-ompass-info">
            <div className="showBox">
              <div id="login-message">
                {t("welcome")}
                <br />
                {localStorage.getItem("userId")} {t("nim")}
                <br />
                {localStorage.getItem("temp") === "Y" ? (
                  <>
                    {localStorage.getItem("u2f") === "Y" ? (
                      <div>
                        <span id="focus">
                          <b style={{ color: "#0096fa" }}>
                            {t("ompass2FaLogin")}
                          </b>
                          {t("ompass2FaLogin2")}
                          <b style={{ color: "#0096fa" }}>
                            {t("ompass2FaLogin3")}
                          </b>
                        </span>
                      </div>
                    ) : (
                      <span id="focus">
                        <b style={{ color: "#0096fa" }}>{t("ompass")}</b>
                        {t("ompass2")}
                        <b style={{ color: "#0096fa" }}>{t("ompass3")}</b>
                      </span>
                    )}
                  </>
                ) : (
                  <span id="focus">
                    <b style={{ color: "#0096fa" }}>{t("passwordLogin")}</b>
                    {t("passwordLogin2")}
                    <b style={{ color: "#0096fa" }}>{t("passwordLogin3")}</b>
                  </span>
                )}
              </div>
            </div>
          </ul>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
export default withRouter(MainContent);
