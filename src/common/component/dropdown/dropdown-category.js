import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import './style.css';

function DropdownCategory({
    type, text, disabled, borderRadius = 25,
    background = '#4D5AF2', textColor = "white", border = 'none',
    margin = '0px', marginLeft, marginRight, marginTop, marginBottom,menu,
    className,
}) {
    return (
        <Dropdown
            type={type}
            className={className}
            disabled={disabled}
            menu = {menu}
            style={{
                backgroundColor: background,
                color: textColor,
                borderRadius: borderRadius,
                border: border,
                margin: margin,
                marginLeft: marginLeft,
                marginRight: marginRight,
                marginTop: marginTop,
                marginBottom: marginBottom,
            }}
        >
            {text}
        </Dropdown>
    );
}

export default DropdownCategory;
