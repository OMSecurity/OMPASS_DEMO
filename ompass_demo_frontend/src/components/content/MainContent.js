import React from "react";
import { useTranslation } from "react-i18next";
import { withRouter, Redirect } from "react-router-dom";
import "../css/mainPage.css";
import img from "../../assets/img/monitor.png";
import ompassLoginImg from "../../assets/img/ompass-tt.png";
import ompassLoginImgEn from "../../assets/img/ompass-ttEnpng.png";

const MainContent = () => {
  const { t } = useTranslation();
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
