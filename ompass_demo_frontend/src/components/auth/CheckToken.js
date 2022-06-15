import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import qs from "qs";

import APIService from "../../lib/API/APIService";
import axios from "axios";
const CheckToekn = ({history , location}) => {
    axios.defaults.headers.common["Authorization"] =  localStorage.getItem('jwtToken');
    const query = qs.parse(location.search,{
        ignoreQueryPrefix :true
    });

    console.log(query.id, query.token);
    APIService.checkMailToken(query.id,query.token)
        .then(res=>{
            console.log(res);
            if(res.data === 'validToken'){

            } else {
                alert('유효하지 않은 토큰입니다. 다시 시도해주세요!');
            }
        })
    return null;
}

export default CheckToekn;