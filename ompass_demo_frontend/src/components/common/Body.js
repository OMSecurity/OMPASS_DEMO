import React from 'react';
import styled from 'styled-components';

import Responsive from './Responsive';
import Button from './Button';


const Body = ({children}) => {
    return (
        <>
            <div className="wrapper">
                {children}
            </div>

        </>
    );
};

export default Body;