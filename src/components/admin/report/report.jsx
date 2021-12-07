import React, { Component } from 'react';
import axios from "axios";
import endpoint from '../../../config';
import toastr from 'toastr';
import Currency from '../../common/currency';


class Report extends Component {
    state = { date: '', response: [] }
    componentDidMount() {
        toastr.options.timeOut = 1000;
    }

    onDateChange = ({ currentTarget }) => {
        let dateState = this.state.date;
        dateState = currentTarget.value;

        this.setState({ date: dateState });
    }

    onGo = () => {
        const date = this.state.date;
        if (date) {
            axios.post(endpoint + "report", { date: date })
                .then(res => this.setState({ response: res.data.data }))
                .catch(err => {
                    toastr.error('Getting report failed')
                });
        }
    }


    render() {
        const { response } = this.state;
        return (
            <div style={{ padding: '30px' }}>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-4 col-xs-6">
                        <div className="input-group">
                            <input type="date"
                                value={this.state.date}
                                onChange={this.onDateChange}
                                className="form-control" />
                            <span className="input-group-btn">
                                <button onClick={this.onGo}
                                    className="btn btn-primary">GO!</button>
                            </span>
                        </div>
                    </div>
                </div>
                {response.report && response.report.length > 0 ?
                    <div style={{ margin: '10px 0' }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price(<span>&#8373;</span>)</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {response.report.map((res, index) =>
                                    <tr key={res.d_id}>
                                        <td>{index + 1}</td>
                                        <td>{res.name}</td>
                                        <td>{res.price}</td>
                                        <td>{res.quantity}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="pull-right">
                            <p style={{ fontSize: '15px' }} className="badge badge-primary">Total: <Currency value={response.total} /></p>
                        </div>
                    </div> :
                    <p style={{ marginTop: '5px' }} className="text-info">No items sold for this date!!</p>
                }
            </div>
        );
    }
}

export default Report;