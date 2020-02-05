import React from 'react';
import { Button } from 'antd';
import './style.css';

function ButtonAuth({
    type, text, disabled, className, style, block, onClick,
}) {
    return (
        <Button
            block={block}
            htmlType="submit"
            type={type}
            className={className}
            disabled={disabled}
            style={style}
            onClick={onClick}
        >
            {text}
        </Button>
    );
}

export default ButtonAuth;