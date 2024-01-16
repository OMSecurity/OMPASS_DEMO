import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import palette from "../../lib/styles/palette";
import APIService from "../../lib/API/APIService";
import axios from "axios";
import no from "../../assets/img/xIcon.png";
import qs from "qs";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const AuthFormBlock = styled.div`
  h2 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1.245rem;
    text-align: center;
  }
`;

const ChangePassword = ({ history, location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { t, i18n } = useTranslation();

  // CustomHook
  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = (e) => {
      setter(e.target.value);
    };
    return [value, handler];
  };

  const [newPassword, onChangeNewPassword] = useInput("");
  const [checkPassword, onChangeCheckPassword] = useInput("");

  const [errorMsg, setErrorMsg] = useState("");
  const [validUser, setVaildUser] = useState("");
  const [token, setToken] = useState();

  useEffect(() => {
    localStorage.setItem("mailToken", query.token);
    axios.defaults.headers.common["MailToken"] =
      localStorage.getItem("mailToken");
    APIService.checkMailToken(query.id, query.token)
      .then((res) => {
        console.log(res);
        if (res.data) {
          setToken(res.headers.authorization);
          setVaildUser("vaild");
        } else {
          setVaildUser("invaild");
        }
      })
      .catch((err) => {
        setVaildUser("tokenExpiration");
      });

    localStorage.setItem("mailToken", query.token);
    axios.defaults.headers.common["MailAuthorization"] =
      localStorage.getItem("mailToken");
  }, []);
  
  const changePassword = useCallback(
    async (e) => {
      e.preventDefault();
      let errorCheck = true;

      if (
        newPassword === "" ||
        newPassword === null ||
        newPassword === undefined
      ) {
        setErrorMsg(t("pleaseEnterPw"));
        errorCheck = false;
        return false;
      }
      if (
        checkPassword === "" ||
        checkPassword === null ||
        checkPassword === undefined
      ) {
        setErrorMsg(t("pleaseEnterYourPasswordAgainForChange"));
        errorCheck = false;
        return false;
      }
      if (checkPassword != newPassword) {
        setErrorMsg(t("passwordDoNotMatch"));
        errorCheck = false;
        return false;
      }

      let sendObj = {
        userId: query.id,
        password: newPassword,
      };
      APIService.changePassword(query.id, newPassword, token).then((res) => {
        console.log(res);
        if (res.status === 200) {
          /*  APIService.callAPI(sendObj.userId)
              .then((res) => {
                alert(t("successChangePassword"));
                history.push("/login");
              })
              .catch((err) => {});*/

          alert(t("successChangePassword"));
          history.push("/login");
        }
      });
      console.log(newPassword, checkPassword);
    },
    [newPassword, checkPassword]
  );

  return (
    <AuthFormBlock>
      {validUser == "invaild" ? (
        <div id="checkTokenMsg">
          <img src={no} />
          <p>
            {validUser != "tokenExpiration"
              ? t("InvalidMailToken")
              : t("mailTokenTimeOut")}{" "}
          </p>
        </div>
      ) : (
        <>
          <h1 className="password-reset"> {t("resetPw")}</h1>
          <form>
            <input
              autoComplete="username"
              name="newPassWord"
              type="password"
              placeholder={t("pleaseEnterNewPassword")}
              onChange={onChangeNewPassword}
            />
            <input
              autoComplete="new-password"
              name="CheckPassword"
              placeholder={t("pleaseEnterNewPasswordAgain")}
              type="password"
              onChange={onChangeCheckPassword}
            />

            {errorMsg && (
              <p className="error-Msg">
                <FontAwesomeIcon icon={faExclamationCircle} /> &nbsp;
                {errorMsg}
              </p>
            )}
            <button
              className="register-button"
              cyan
              fullWidth
              onClick={changePassword}
            >
              {t("changePw")}
            </button>
          </form>
        </>
      )}
    </AuthFormBlock>
  );
};

export default withRouter(ChangePassword);
