import React from 'react';
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