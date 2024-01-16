import React from "react";
import {withRouter} from "react-router-dom";

import "antd/dist/antd.css";
import "../css/header.css";
import logo from "../../assets/img/logo.png";
import {useTranslation} from "react-i18next";


const Header = ({history}) => {
    const goLogout = () => {
        localStorage.clear();
        history.push("/login");
    };
    const {t} = useTranslation();

    return (
        <>
            <div id="header-block">
                <div className="wrapper" id="header-wrapper">
                    <div className="logo">
                        <img id="logImg" src={logo}/>
                    </div>

                    {localStorage.getItem("userId") ? (
                        <div className="right">
                            <button id="logoutBtn" cyan onClick={goLogout}>
                                {t("logout")}
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default withRouter(Header);
