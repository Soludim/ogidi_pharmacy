import React from 'react';
import Drug from './Drug';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './admin-drug.css'

const AdminDrugs = ({ drugs, edit, del, startIndex }) => {

    const itemsList = drugs.map((drug, index) => {
        return (
            <CSSTransition key={index} timeout={500} classNames="move">
                <Drug drug={drug} key={index}
                    index={startIndex + index}
                    onEdit={e => edit(drug)}
                    onDelete={e => del(drug)} />
            </CSSTransition>
        );
    });
    return (
        <div className="">
            <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th></th>
                        </tr>
                    </thead>
                    <TransitionGroup component="tbody">
                        {itemsList}
                    </TransitionGroup>
                </table>
            </div>
        </div>
    );
}

export default AdminDrugs;