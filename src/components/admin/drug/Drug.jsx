import React from 'react';

const AdminDrug = ({ drug, index, onEdit, onDelete }) => {
    return (
        <tr key={drug.id} >
            <td>{index + 1}</td>
            <td>{drug.name}</td>
            <td>{drug.price}</td>
            <td>{drug.availability}</td>
            <td>
                <button style={{ marginRight: '2px' }}
                    className="btn btn-success btn-xs"
                    onClick={onEdit}>
                    <span className="fa fa-edit"></span> Edit</button>
                <button className="btn btn-danger btn-xs" onClick={onDelete}>
                    <span className="fa fa-trash"></span> Dele</button>
            </td>
        </tr>
    );
}

export default AdminDrug;
