import React from 'react';
import './style.css';

function Marker({
    color, name, id
}) {
    return (
        <div className="marker"
            style={{ backgroundColor: color, cursor: 'pointer'}}
            title={name}
      />
    );
}

export default Marker;