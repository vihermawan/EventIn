import React from 'react';
import { Input,  Icon } from 'antd';
import './style.css';

function InputSearch({
    value, onChange, placeholder, className, style, name, type,onSearch,
    iconType = 'user', withIcon = true, iconColor = 'white',
}) {
    return (
      <Input
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onSearch={onSearch}
        className={className}
        prefix={withIcon ? <Icon type={iconType} style={{ color: iconColor, fontSize: '16px' }} /> : false}
        style={style}
        type={type}
    />
    );
}

export default InputSearch;