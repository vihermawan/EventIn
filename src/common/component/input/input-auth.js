import React from 'react';
import { Input, Icon } from 'antd';
import './style.css';

function InputAuth({
    value, onChange, placeholder, className, style, name, type,
    iconType = 'user', withIcon = true, iconColor = 'white',
}) {
    return (        
        <Input
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className={className}
            prefix={withIcon ? <Icon type={iconType} style={{ color: iconColor, fontSize: '16px' }} /> : false}
            style={style}
            type={type}
        />
    );
}

export default InputAuth;