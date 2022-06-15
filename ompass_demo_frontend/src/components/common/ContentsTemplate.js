import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import Body from "./Body";


const ContentsTemplate = ({children}) => {
    return (
        <>
            <Body>
                {children}
            </Body>
        </>
    );
};

export default ContentsTemplate;