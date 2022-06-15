import React, {useEffect, useState} from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';

import LoginFrom from "../components/auth/LoginForm";
import '../components/css/loginPage.css';
const LoginPage = () => {
    const [lang,setLang] = useState('');



    return (
        <AuthTemplate lang ={lang}>
            <LoginFrom lang = {lang} />
        </AuthTemplate>
    );
};

export default LoginPage;