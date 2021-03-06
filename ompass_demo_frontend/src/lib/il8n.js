import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
  en: {
    translation: {
      Login: "Login",
      OMPASSLogin: "OMPASS Login",

      Welecometo: "",
      OMPASS: "OMPASS",
      goBack: "Go back",
      OMPASSText: "Welcome to the demo site.",
      Welecometo2: "Welecome to",
      OMPASS2: "OMPASS",
      TTA: "Certification of GS 1st Grade from TTA",
      subTitle: "Next-generation integrated authentication solution",
      FidoAlliance: "FIDO Alliance International Certification",
      enterId: "Enter ID",
      enterPw: "Enter password",
      invalidFidoToken: "Invalid access key. Please contact your manager",
      successLogin: "Login succeeded",
      failLogin: "ID or password does not match",
      wrongId: "Invalid ID",
      goRegister: "Don't have a OMPASS account?",
      findPw: "Forgot your passowrd?",
      register: "Register",
      resetPw: "Reset password",
      sendInitMail: "A verification email has been sent",

      pleaseEnterId: "Please enter your ID",
      existId: "Please enter your ID",
      pleaseEnterPw: "Please enter your password",
      passwordDoNotMatch: "Passwords do not match",
      enterName: "Enter name",
      enterEmail: "Enter email",
      successRegister: "Registration completed",
      failRegister: "Registration failed",
      pleaseEnterYourPasswordAgain: "Please enter your password again",
      findId: "Find ID",
      findPw2: "Find password",
      id: "ID",
      pw: "Password",
      email: "Email",
      name: "Name",
      login: "Home",
      logout: "Logout",

      welcome: "Welcome,",
      // ompass2FaLogin:
      //   "You have been successfully authenticated via Two-Factor Athentication.",
      ompass2FaLogin: "",
      ompass2FaLogin2: "You have been successfully authenticated via ",
      ompass2FaLogin3: "Two-Factor Athentication.",
      // ompass:
      //   "You have been successfully authenticated via Two-Factor Athentication.",
      ompass: "",
      ompass2: "You have been successfully authenticated via",
      ompass3: " OMPASS",
      passwordLogin: "",
      passwordLogin2: "You have been successfully authenticated via ",
      passwordLogin3: "password login.",
      deleteOmpass: "Using OMPASS",
      registerOmpass: "Register OMPASS",
      disableOmpass: "Disable Two-Factor Authentication",
      enableOmpass: "Enable Two-Factor Authentication",
      nim: "!",

      successDeleteFido: "FIDO2 deletion is completed",
      tryAgain: "Please try again",

      pleaseEnterYourPasswordAgainForChange: "Please enter your password again",
      successChangePassword: "Please enter your password again",
      pleaseEnterNewPassword: "Please enter new password",
      pleaseEnterNewPasswordAgain: "Please enter new password",
      changePw: "Change",
      InvalidMailToken: "This original email verification is no longer valid",
      mailTokenTimeOut: "E-mail verification time is expired",

      invalidID: "This ID does not exist. Please register it first.",
      goPasswordLogin: "Please proceed with password login first",
      successOmpass2fa: "OMPASS secondary authentication completed",
      successOmpassAuth: "OMPASS authentication completed",
      failFidoLogin: "OMPASS authentication completed",

      successRegisterOmpass: "OMPASS registration completed",
      failRegisterOmpass:
        "OMPASS registration failed due to token authentication failure",
    },
  },
  ko: {
    translation: {
      Login: "?????????",
      Welecometo2: "",
      OMPASS2: "",
      OMPASSLogin: "OMPASS ?????????",
      Welecometo: "??? ????????? ???????????????.",
      OMPASS: "???????????????",
      OMPASSText: "?????? ???????????? ????????? ???????????????.",
      goBack: "????????????",
      TTA: "TTA GS 1?????? ??????",
      subTitle: "????????? ?????? ?????? ?????????",
      FidoAlliance: "FIDO Aliance ?????? ??????",
      enterId: "???????????? ??????????????????.",
      enterPw: "??????????????? ???????????????.",
      invalidFidoToken:
        "???????????? ?????? Access Key ?????????. ??????????????? ???????????????.",
      successLogin: "????????? ??????",
      failLogin: "????????? ?????? ??????????????? ???????????? ????????????.",
      wrongId: "????????? ????????? ?????????.",
      goRegister: "?????? ????????? ????????????????",
      findPw: "??????????????? ????????????????",
      register: "????????????",
      resetPw: "???????????? ?????????",
      sendInitMail: "??????????????? ?????????????????????.",

      pleaseEnterId: "???????????? ???????????????.",
      existId: "???????????? ????????? ?????????.",
      pleaseEnterPw: "??????????????? ???????????????.",
      passwordDoNotMatch: "??????????????? ???????????? ????????????.",
      enterName: "????????? ???????????????.",
      enterEmail: "???????????? ???????????????",
      successRegister: "???????????? ??????",
      failRegister: "???????????? ??????",
      pleaseEnterYourPasswordAgain: "???????????? ?????????",
      findId: "????????? ??????",
      findPw2: "???????????? ??????",
      id: "?????????",
      pw: "????????????",
      email: "?????????",
      name: "??????",
      login: "???",

      logout: "????????????",

      welcome: "???????????????.",
      ompass2FaLogin: "??????????????? 2??? ??????",
      ompass2FaLogin2: " ??? ?????? ?????????????????????.",
      ompass2FaLogin3: "",
      ompass: "???????????????",
      ompass2: " ??? ?????? ?????????????????????.",
      ompass3: "",
      passwordLogin: "???????????? ?????????",
      passwordLogin2: "??? ?????? ?????????????????????.",
      passwordLogin3: "",
      deleteOmpass: "OMPASS ?????????",
      registerOmpass: "OMPASS ??????",
      disableOmpass: "2??? ?????? ??????",
      enableOmpass: "2??? ?????? ??????",
      nim: "??????",

      successDeleteFido: "FIDO2 ????????? ?????????????????????.",
      tryAgain: "?????? ??????????????????",

      pleaseEnterYourPasswordAgainForChange:
        "????????? ??????????????? ?????? ???????????????.",
      successChangePassword: "??????????????? ?????? ???????????????.",
      pleaseEnterNewPassword: "????????? ??????????????? ???????????????.",
      pleaseEnterNewPasswordAgain: "??????????????? ?????? ?????? ???????????????",
      changePw: "???????????? ????????????",
      InvalidMailToken: "?????? ?????? ????????? ???????????? ????????????.",
      mailTokenTimeOut: "?????? ?????? ??????????????? ?????????????????????.",

      invalidID: "???????????? ?????? ???????????????. ???????????? ??? ??????????????????",
      goPasswordLogin: "1??? ??????(???????????? ?????????)??? ?????? ??????????????????",
      successOmpass2fa: "OMPASS 2??? ????????? ?????? ???????????????",
      successOmpassAuth: "OMPASS ????????? ?????????????????????",
      failFidoLogin: "OMPASS ????????? ?????????????????????. ?????? ??????????????????.",

      successRegisterOmpass: "OMPASS ????????? ?????????????????????",
      failRegisterOmpass: "OMPASS ????????? ?????????????????????. (?????? ?????? ??????)",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
});

export default i18n;
