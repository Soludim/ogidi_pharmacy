import React from 'react';
import Item from './item';
import ConfirmModal from '../common/confirmModal'
const CheckoutList = (props) => {
    const { cart, checkout, increase, decrease } = props;
    return (
        <div className="">
            <ConfirmModal onProceed={checkout} />
            <h4 style={{ fontWeight: 'bolder' }}>Checked Drugs</h4>
            <div style={{ border: '1px solid black' }}></div>
            {cart.length <= 0 ? <p style={{ fontSize: 'smaller' }}>No Items in the cart</p> : null}

            {cart.map(c => <Item key={c.d_id} drug={c} inc={e => increase(c)} dec={e => decrease(c)} />)}

            <br />
            <div className="pull-right" style={{paddingBottom: '5px'}}>
                <button
                    type="button"
                    disabled={cart.length <= 0}
                    className="btn btn-default"
                    data-toggle="modal" data-target="#requestModal">
                    <span className="fa fa-handshake"></span> Checkout
              </button>
            </div>
        </div>
    );
}

export default CheckoutList;