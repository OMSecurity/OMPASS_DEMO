import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import APIService from "../../lib/API/APIService";
import axios from "axios";
import { message, Tabs } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import icon from "../../static/img/icon-lg.png";
import no from "../../static/img/pngwing.com.png";
import qs from "qs";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

function callback(key) {
  console.log(key);
}

const AuthFormBlock = styled.div`
  h2 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1.245rem;
    text-align: center;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
  a,
  p {
    color: ${palette.gray[6]};
    text-decoration: none;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

/**
 * 에러를 보여줍니다
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const BorderDiv = styled.div`
  width: 100%;
  margin-top: -16px;
  border: 1px solid #e9ecef;
  padding-bottom: 10px;
  height: 300px;
`;

const MySpan = styled.span`
  color: ${palette.cyan[9]};
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
  let color = "#868e96";
  const [newPassword, onChangeNewPassword] = useInput("");
  const [checkPassword, onChangeCheckPassword] = useInput("");

  const [errorMsg, setErrorMsg] = useState("");
  const [errorCheck, setErrorCheck] = useState(true);
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
    /*      APIService.checkMailToken(query.id,query.token)
                  .then(res=>{
                      console.log(res);
                      if(res.data === 'validToken'){
                          setVaildUser('vaild')
                      } else {
                          setVaildUser('invaild')
                      }
                  })*/
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

      setErrorCheck("");
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
