import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import endpoint from '../../config';
import toastr from 'toastr';


class CreateDrug extends Component {
    state = { name: '', availability: '', price: '', mode: 1 }

    //1 => create, 2 => edit
    componentDidMount() {
        toastr.options.timeOut = 1000;
        if (this.props.match.params.id) {
            axios
                .get(endpoint + "drug/" + this.props.match.params.id)
                .then(res => {
                    this.setState({
                        mode: 2, name: res.data.data.name,
                        availability: res.data.data.availability,
                        price: res.data.data.price
                    }); //set to edit mode and initialize fields
                })
                .catch(err => {
                    toastr.error('Getting drug failed')
                });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.mode === 1) {
            //create mode
            axios.post(endpoint + "drug", {
                name: this.state.name,
                price: this.state.price,
                availability: this.state.availability
            }).then(res => {
                this.props.history.replace('/admin');
            }).catch(err => {
                toastr.error('Something went wrong.')
            })
        } else {
            //edit mode
            axios.patch(endpoint + "drug/" + this.props.match.params.id, {
                name: this.state.name,
                price: this.state.price,
                availability: this.state.availability
            }).then(res => {
                this.props.history.replace('/admin');
            }).catch(err => {
                toastr.error('Something went wrong.')
            })
        }

    }


    handleValueChange = ({ currentTarget: input }) => {
        switch (input.id) {
            case "name":
                this.setState({ name: input.value });
                break;
            case "price":
                this.setState({ price: input.value });
                break;
            case "availability":
                this.setState({ availability: input.value });
                break;
            default: ;
        }

    }

    render() {
        const { name, availability, price, mode } = this.state;
        return (
            <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="panel-title">
                            <p>{mode === 1 ? 'Add New Drug' : 'Edit Drug'}</p>
                        </div>
                    </div>
                    <div className="panel-body" >
                        <form autoComplete="off" onSubmit={this.handleSubmit}>
                            <div className="row" style={{ padding: '10px' }}>
                                <input type="text" className="form-control"
                                    placeholder="Drug name..."
                                    value={name} id="name"
                                    required
                                    onChange={this.handleValueChange} />
                            </div>
                            <div className="row" style={{ padding: '10px' }}>
                                <input type="number" step="0.1" className="form-control"
                                    placeholder="Price"
                                    min="0.1" id="price"
                                    value={price}
                                    required
                                    onChange={this.handleValueChange} />
                            </div>
                            <div className="row" style={{ padding: '10px' }}>
                                <input type="number" className="form-control"
                                    placeholder="Availability"
                                    min="1"
                                    required id="availability"
                                    value={availability}
                                    onChange={this.handleValueChange} />
                            </div>
                            <div className="pull-right">
                                <button type="submit" className="btn btn-default">
                                    <span className="fa fa-paper-plane"></span> {mode === 1 ?
                                        'ADD' : 'EDIT'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateDrug);