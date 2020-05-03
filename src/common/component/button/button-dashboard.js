import React from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css';

function ButtonDashboard({
    type, text, disabled, height = 48, borderRadius = 25,
    background = '#4D5AF2', textColor = "white", border = 'none',
    margin , marginLeft, marginRight, marginTop, marginBottom,
    width, icon, onClick,paddingRight,paddingLeft,float,textAlign, display
}) {
    return (
        <Button
            type={type}
            className="button-rounded"
            disabled={disabled}
            style={{
                backgroundColor: background,
                color: textColor,
                minHeight: height,
                borderRadius: borderRadius,
                paddingLeft: paddingLeft,
                paddingRight: paddingRight,
                border: border,
                margin: margin,
                width : width,
                marginLeft: marginLeft,
                marginRight: marginRight,
                marginTop: marginTop,
                marginBottom: marginBottom,
                float : float,
                textAlign : textAlign,
                display : display
            }}
            onClick={onClick}
        >
            <FontAwesomeIcon
                icon={icon}
                // style={{marginRight: 10}}
            /> 
            {text}
        </Button>
    );
}

export default ButtonDashboard;