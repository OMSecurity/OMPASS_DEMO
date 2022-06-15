import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';

import ChangePasssword from "../components/auth/ChangePasssword";

const ChangePassword = () => {
    return (
        <AuthTemplate>
            <ChangePasssword/>
        </AuthTemplate>
    );
};

export default ChangePassword;