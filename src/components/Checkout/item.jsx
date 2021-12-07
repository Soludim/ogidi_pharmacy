import React from 'react';
import Currency from '../common/currency';

const CheckItem = ({ drug, inc, dec }) => {
    let itemStyle = {
        border: '1px solid #e9e9e9',
        padding: '2px',
        marginTop: '2px',
        marginBottom: '2px'
    }
    return (
        <div style={itemStyle}>
            <p style={{ fontWeight: 'bolder' }}>{drug.name} * {drug.quantity}</p>
            <button className="btn btn-danger btn-xs" style={{ marginRight: '4px' }} onClick={inc}>
                <span className="fa fa-plus"></span>
            </button>
            <button className="btn btn-danger btn-xs" onClick={dec}>
                <span className="fa fa-minus"></span>
                </button>
            <p style={{ marginTop: '4px' }}>Total:<span className="badge badge-success">
                <Currency value={drug.price * drug.quantity}/></span> </p>
        </div >
    );
}

export default CheckItem;