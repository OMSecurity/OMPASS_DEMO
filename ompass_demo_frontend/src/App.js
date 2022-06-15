import React from 'react';
import {Route,Switch} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import MyPage from "./pages/MyPage";
import ChangePassword from "./pages/ChangePwPage";
import VerifyRedirectToken from "./components/fido2/VerifyRedirectToken";

import NotFound from "./pages/NotFound";


const App = () => {
    return (
        <Switch>
            <Route path="/" exact={true} component={MainPage}/>
            <Route component={LoginPage} path="/login"/>
            <Route component={RegisterPage} path="/register"/>
            <Route component={MyPage} path ="/mypage"/>
            <Route component={VerifyRedirectToken} path ="/ompass"/>
            <Route component={ChangePassword} path="/auth"/>
            <Route render = {({location}) => <NotFound/>} />
        </Switch>
    );
};
export default App;