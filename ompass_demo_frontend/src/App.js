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
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path ="/mypage" component={MyPage}/>
            <Route path ="/ompass" component={VerifyRedirectToken}/>
            <Route path="/auth" component={ChangePassword}/>
            <Route component={NotFound} />
        </Switch>
    );
};
export default App;