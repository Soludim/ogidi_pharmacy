import React from 'react';

const ConfirmModal = ({ onProceed }) => {
    return (
        <div aria-hidden="true" aria-labelledby="prayerRequestModal" role="dialog" tabIndex="-1" id="requestModal" className="modal fade">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Checkout</h5>
                        <button type="button" className="close"
                            data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div className="modal-body">
                        <p style={{ fontWeight: 'bold' }}>Are you sure you want to proceed to checkout?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-default" data-dismiss="modal"
                            type="button">Cancel</button>
                        <button className="btn btn-primary" data-dismiss="modal"
                            type="button" onClick={onProceed}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;