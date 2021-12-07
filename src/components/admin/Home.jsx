import React, { Component } from 'react';
import Drugs from './drug/Drugs';
import { withRouter } from 'react-router-dom'
import Search from '../common/searchbox';
import axios from 'axios';
import endpoint from '../../config';
import Pagination from '../common/paginate';
import { paginate } from '../../utils/paginate.js';
import toastr from 'toastr';

class AdminHome extends Component {
    state = { drugs: [], searchQuery: '', loading: false, pageSize: 10, currentPage: 1 }

    componentDidMount() {
        toastr.options.timeOut = 1000;
        this.setState({ loading: true });
        axios
            .get(endpoint + "drug")
            .then((res) => {
                this.setState({ loading: false, drugs: res.data.data });
            })
            .catch((err) => {
                this.setState({ loading: false });
                alert(err);
            });
    }

    handleSearch = (query) => {
        this.setState({ searchQuery: query });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    getData = () => {
        const { searchQuery, drugs, pageSize, currentPage } = this.state;

        let filtered = drugs;
        if (this.state.searchQuery)
            filtered = drugs.filter((m) =>
                m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
            );

        const totalCount = filtered ? filtered.length : 0;
        const data = paginate(filtered, currentPage, pageSize);

        return { totalCount, drugs: data };
    };

    handleCreate = () => {
        this.props.history.push('/create')
    }

    handleEdit = (drug) => {
        this.props.history.push('/create/' + drug._id);
    }
    handleDelete = (drug) => {
        if (true) {
            axios
                .delete(endpoint + "drug/" + drug._id)
                .then(res => {
                    let drugs = this.state.drugs;
                    let index = drugs.indexOf(drug);
                    drugs.splice(index, 1);
                    this.setState({ drugs })
                    toastr.success(res.data.message);
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }

    handleViewReport = () => {
        this.props.history.push('/report');
    }

    render() {
        const { loading, searchQuery, currentPage, pageSize } = this.state;
        const { totalCount, drugs } = this.getData();

        return (
            <React.Fragment>
                {loading ? <div className="loading">Loading</div> : null}
                {drugs ? (
                    <div className="container">
                        <div className="row">
                            <div className="pull-right" style={{margin: '4px'}}>
                                <button className="btn btn-default btn-sm"
                                    style={{ marginRight: '4px' }}
                                    onClick={this.handleCreate}>
                                    <span className="fa fa-capsules"></span> ADD NEW DRUG</button>
                                <button className="btn btn-primary btn-sm"
                                    onClick={this.handleViewReport}>
                                    <span className="fa fa-history"></span> View Report</button>
                            </div>
                            <div className="pull-left" style={{margin: '4px'}}>
                                <Search value={searchQuery} onChange={this.handleSearch} />
                            </div>
                        </div>
                        <hr />
                        <Drugs drugs={drugs} startIndex={(currentPage - 1) * pageSize} del={this.handleDelete} edit={this.handleEdit} />
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={this.state.pageSize}
                            currentPage={this.state.currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>)
                    : null}
            </React.Fragment>
        );
    }
}

export default withRouter(AdminHome);