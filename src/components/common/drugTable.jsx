import React from 'react';

const selectDrugTable = (props) => {

    const { drugs, onAdd } = props;
    return (
        <React.Fragment>
            {drugs.length > 0 ?
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Availability</th>
                            <th>Price(<span>&#8373;</span>)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {drugs.map(drug =>
                            <tr key={drug._id}>
                                <td>{drug.name}</td>
                                <td>{drug.availability}</td>
                                <td>{drug.price}</td>
                                <td><button type="button" style={{ marginRight: '2px' }}
                                    disabled={drug.availability <= 0} className="btn btn-xs btn-primary" onClick={e => onAdd(drug)}>
                                    <span className="fa fa-cart-plus"></span> Add</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                : <p className="text-info"> No matched item!!!</p>}
        </React.Fragment>
    );
}

export default selectDrugTable;