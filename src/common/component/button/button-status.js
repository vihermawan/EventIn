import React from 'react';
import { Button } from 'antd';
import './style.css';

function ButtonStatus({
    type, text, disabled, height = 20, borderRadius = 25,
    background = '#4D5AF2', textColor = "white", border = 'none',
    margin , marginLeft, marginRight, marginTop, marginBottom,
    icon, onClick,paddingRight,paddingLeft,float,textAlign
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
                textAlign : textAlign
            }}
            onClick={onClick}
        >
            {text}
        </Button>
    );
}

export default ButtonStatus;