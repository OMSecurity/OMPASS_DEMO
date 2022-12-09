import axios from 'axios';

import {RP_SERVER_URL, INTERFACE_SERVER_URL} from "../../rest/Url";

const RP_URL = RP_SERVER_URL();

class APIService {
    signup(user) {
        return axios.post(RP_URL + '/auth/users', user);
    }

    loginByU2F(user) {
        return axios.post(RP_URL + '/auth/login/u2f', user);
    }

    loginByUAF(lang) {
        return axios.post(RP_URL + '/auth/login/uaf', {lang});
    }

    idCheck(userId) {
        return axios.get(RP_URL + '/auth/users?userId=' + userId);
    }

    getOmpassRegisterUri(userId) {
        return axios.get(RP_URL + '/ompass/registration/uri?id=' + userId);
    }

    verifyOmpassAccessToken(verificationInfo) {
        return axios.post(RP_URL + '/auth/ompass/token-verification', verificationInfo);
    }

    fido2UserList() {
        return axios.get(RP_URL + '/user/fido2');
    }

    getUserInfo(userId) {
        return axios.get(RP_URL + '/user/info?userId=' + userId);
    }

    updateSecCert(userId) {
        return axios.get(RP_URL + "/user/update-secCert?userId=" + userId);
    }

    registerForFido(userId) {
        return axios.get(RP_URL + "/user/register-fido2?userId=" + userId);
    }

    deleteForFido(userId) {
        return axios.get(RP_URL + "/user/delete-fido2?userId=" + userId);
    }

    loginForFido(userId) {
        return axios.get(RP_URL + "/auth/fido-login?userId=" + userId);
    }

    checkToken() {
        return axios.get(RP_URL + "/token/checkToken")
    }

    refreshToken(userId) {
        return axios.get(RP_URL + "/token/refresh-token/userId/" + userId);
    }

    resetCookie() {
        return axios.get(RP_URL + "/auth/reset-cookie");
    }

    generateAccessToken(sendObj) {
        return axios.post(RP_URL + "/ompass/generate-accessToken", sendObj);
    }

    sendMail(userId, lang) {
        console.log(`user id : ${userId}, lang : ${lang}`);
        return axios.get(RP_URL + "/auth/users/mail?userId=" + userId + "&lang=" + lang);
    }

    checkMailToken(userId, token) {
        console.log(`user id : ${userId}, token : ${token}`);
        return axios.post(RP_URL + `/auth/users/mail/token-verification`, {userId, token});
    }

    changePassword(userId, newPassword, token) {
        console.log(`user id : ${userId}, newPassword : ${newPassword}, token : ${token}`);
        let headers = {
            'Authorization' : `Bearer ${token}`
        }
        return axios.put(RP_URL + "/auth/users/init?userId=" + userId, {newPassword}, {headers});
    }

    cancel2Fa(userId) {
        return axios.get(RP_URL + "/user/cancel-secCert?userId=" + userId);
    }
}

export default new APIService();