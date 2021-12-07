import React from 'react';

const Currency = ({ value }) => {
    return (
        <React.Fragment><span>&#8373;</span> {value}</React.Fragment>
    );
}

export default Currency;