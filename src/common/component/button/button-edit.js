import React from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css';

function ButtonEdit({
    type, text, disabled, height = 48, borderRadius = 25,
    background = '#4D5AF2', textColor = "white", border = 'none',
    margin , marginLeft, marginRight, marginTop, marginBottom,
    icon, onClick,paddingRight,paddingLeft,float,textAlign,fontSize
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
                marginLeft: marginLeft,
                marginRight: marginRight,
                marginTop: marginTop,
                marginBottom: marginBottom,
                float : float,
                textAlign : textAlign,
                fontSize : fontSize
            }}
            onClick={onClick}
        >
            <FontAwesomeIcon
                icon={icon}
                style={{marginRight: 10}}
            /> 
            {text}
        </Button>
    );
}

export default ButtonEdit;