import React from 'react';
import { Button } from 'antd';
import './style.css';

function ButtonAuth({
    type, text, disabled, className, style, block,
}) {
    return (
        <Button
            block={block}
            htmlType="submit"
            type={type}
            className={className}
            disabled={disabled}
            style={style}
        >
            {text}
        </Button>
    );
}

export default ButtonAuth;