import React, {useCallback, useState} from "react";
import styled from "styled-components";
import {Link, withRouter} from "react-router-dom";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import APIService from "../../lib/API/APIService";
import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

const AuthFormBlock = styled.div`
  h4 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1.245rem;
    text-align: center;
  }
`;

const RegisterForm = ({history}) => {
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const {t, i18n} = useTranslation();
    // CustomHook
    const useInput = () => {
        const [value, setter] = useState(null);
        const handler = (e) => {
            setter(e.target.value);
        };
        return [value, handler];
    };

    const [userId, onChangeUserId] = useInput("");
    const [password, onChangePassword] = useInput("");
    const [email, onChangeEmail] = useInput("");
    const [name, onChangeName] = useInput("");

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            let errorCheck = true;
            setErrorMsg("");

            APIService.idCheck(userId).then((res) => {
                if (userId === "" || userId === null || userId === undefined) {
                    setErrorMsg(t("pleaseEnterId"));
                    errorCheck = false;
                    return false;
                }

                if (res.data) {
                    setErrorMsg(t("existId"));
                    errorCheck = false;
                    return false;
                }

                if (password === "" || password === null || password === undefined) {
                    setErrorMsg(t("pleaseEnterPw"));
                    errorCheck = false;
                    return false;
                }

                if (!passwordError) {
                    console.log(password);
                    setErrorMsg(t("passwordDoNotMatch"));
                    errorCheck = false;
                    return false;
                }

                if (name === "" || name === null || name === undefined) {
                    setErrorMsg(t("enterName"));
                    errorCheck = false;
                    return false;
                }

                if (email === "" || email === null || email === undefined) {
                    setErrorMsg(t("enterEmail"));
                    errorCheck = false;
                    return false;
                }

                if (errorCheck) {
                    const user = {userId, password, email, name};
                    console.log('test : ', user);
                    APIService.signup(user).then((res) => {
                        if (res.status === 201) {
                            alert(t("successRegister"));
                            history.push("/login");
                        } else {
                            alert(t("failRegister"));
                        }
                    });
                }
            });
        },
        [userId, password, passwordCheck, email]
    );

    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordError(e.target.value === password);
            setPasswordCheck(e.target.value);
        },
        [passwordCheck]
    );

    return (
        <AuthFormBlock>
            <form className="form" onSubmit={onSubmit}>
                <div className="formDiv">
                    <input
                        autoComplete="username"
                        name="userId"
                        placeholder={t("id")}
                        onChange={onChangeUserId}
                    />

                    <input
                        autoComplete="new-password"
                        name="password"
                        placeholder={t("pw")}
                        type="password"
                        onChange={onChangePassword}
                    />
                    <input
                        autoComplete="new-password"
                        name="check-password"
                        placeholder={t("pleaseEnterYourPasswordAgain")}
                        type="password"
                        onChange={onChangePasswordCheck}
                    />
                    <input
                        autoComplete="name"
                        name="name"
                        placeholder={t("name")}
                        onChange={onChangeName}
                    />
                    <input
                        autoComplete="email"
                        name="email"
                        placeholder={t("email")}
                        type="email"
                        onChange={onChangeEmail}
                    />

                    {errorMsg && (
                        <p className="error-Msg">
                            <FontAwesomeIcon icon={faExclamationCircle}/> &nbsp;
                            {errorMsg}
                        </p>
                    )}
                    <button className="register-button">{t("register")}</button>
                </div>
            </form>

            <div id="login-footer">
                <Link to="/login">
                    <span className="mySpan">{t("goBack")}</span>{" "}
                </Link>
            </div>
        </AuthFormBlock>
    );
};

export default withRouter(RegisterForm);
