import React from 'react';
import { Input } from 'antd';
import './style.css';

function InputSearch({
    type, text, disabled, borderRadius = 25,
    background = '#4D5AF2', textColor = "white", border = 'none',
    margin = '0px', marginLeft, marginRight, marginTop, marginBottom,
    className,
}) {
    return (
    <search
      placeholder="input search text"
      onSearch={value => console.log(value)}
      style={{ width: 200 }}
    />
    );
}

export default InputSearch;