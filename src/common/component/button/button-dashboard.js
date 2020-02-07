import React from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css';

function ButtonDashboard({
    type, text, disabled, height = 48, borderRadius = 25,
    background = '#4D5AF2', textColor = "white", border = 'none',
    margin , marginLeft, marginRight, marginTop, marginBottom,
    navigate, target, icon, onClick
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
                paddingLeft: 30,
                paddingRight: 30,
                border: border,
                margin: margin,
                marginLeft: marginLeft,
                marginRight: marginRight,
                marginTop: marginTop,
                marginBottom: marginBottom,
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

export default ButtonDashboard;