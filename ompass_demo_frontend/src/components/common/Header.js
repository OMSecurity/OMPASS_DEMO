import React, {useEffect, useState} from "react";
import styled from "styled-components";

import Responsive from "./Responsive";
import Button from "./Button";
import {Link, withRouter, Redirect} from "react-router-dom";

import "antd/dist/antd.css";
import APIService from "../../lib/API/APIService";
import "../css/header.css";
import logo from "../../static/img/logologo.png";
import {Buffer} from "buffer";
import {useTranslation} from "react-i18next";


const Header = ({history}) => {
    const goLogout = () => {
        const userId = localStorage.getItem("userId");
        localStorage.clear();
        history.push("/login");
    };
    const {t, i18n} = useTranslation();

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
