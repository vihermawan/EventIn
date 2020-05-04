import React from 'react';
import { Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css';

function InputFormPassword({
    value, onChange, placeholder, className, style, name, type,
    iconType = 'user', withIcon = true, iconColor = '#2C37BA', disabled, icon
}) {
    return (        
        <Input.Password
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className={className}
            prefix={withIcon ? <FontAwesomeIcon
                icon={icon}
                style={{marginRight: 10,color:"#2C37BA"}}
            />  : false}
            style={style}
            type={type}
            disabled = {disabled}
        />
    );
}

export default InputFormPassword;