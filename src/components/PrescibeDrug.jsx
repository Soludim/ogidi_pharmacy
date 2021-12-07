import React, { PureComponent } from "react";
import SearchBox from "./common/searchbox";
import Pagination from './common/paginate';
import DrugTable from "./common/drugTable";
import axios from "axios";
import toastr from 'toastr';
import endpoint from '../config';
import CheckList from './Checkout/checkout_lists';
import { paginate } from '../utils/paginate.js';


class PrescribeDrug extends PureComponent {
  state = { loading: false, drugs: [], cart: [], searchQuery: "", pageSize: 10, currentPage: 1 };

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
        toastr.error("Loading data failed");
      });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  }

  handleIncrease = (cartItem) => {
    let itemInDrugs = this.state.drugs.find(d => d._id === cartItem.d_id);

    if (itemInDrugs.availability <= cartItem.quantity) return;   //when drug is short
    const cartState = [...this.state.cart];
    let itemIndex = this.state.cart.indexOf(cartItem);
    cartItem.quantity++
    cartState[itemIndex] = cartItem;

    this.setState({ cart: cartState });
  };

  handleDecrease = (cartItem) => {
    const cartState = [...this.state.cart];
    let itemIndex = this.state.cart.indexOf(cartItem);
    if (cartItem.quantity === 1) {
      cartState.splice(itemIndex, 1); //remove item from list
    } else {
      cartItem.quantity--;  //reduce item quantity
      cartState[itemIndex] = cartItem;
    }

    this.setState({ cart: cartState });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  handleAddToCart = (drug) => {
    let added = this.state.cart.find(c => c.d_id === drug._id); //item already added
    if (added) {
      return this.handleIncrease(added);
    }
    var date = new Date();
    let newItem = {
      d_id: drug._id,
      name: drug.name,
      price: drug.price,
      quantity: 1,
      dateTime: date.toLocaleDateString()
    }
    const newState = [...this.state.cart, newItem];
    this.setState({ cart: newState });
  }

  handleCheckout = () => {
    const cart = this.state.cart;
    const drugs = [...this.state.drugs];
    axios.post(endpoint + "cart", cart).then(res => {
      console.log(res);
      drugs.forEach(d => {
        let found = cart.find(c => c.d_id === d._id);
        if (found) {
          d.availability -= found.quantity
        }
      })
      this.setState({ drugs, cart: [] })
      toastr.success('Checkout was successful');
    }).catch(err => {
      toastr.error('Checkout was unsuccessful');
    })
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

  render() {
    const { loading, searchQuery, cart } = this.state;
    const { totalCount, drugs } = this.getData();
    return (
      <React.Fragment>
        {loading ? <div className="loading">Loading</div> : null}
        {drugs ? (
          <div className="">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="col-lg-5 col-md-6 col-sm-7">
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </div>
              <div style={{ border: '1px solid #e9e9e9', padding: '10px', marginTop: '20px' }}>
                <DrugTable
                  drugs={drugs}
                  onAdd={this.handleAddToCart}
                />
                <Pagination
                  itemsCount={totalCount}
                  pageSize={this.state.pageSize}
                  currentPage={this.state.currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-lg-offset-1 col-md-4 col-sm-4">
              <CheckList cart={cart} checkout={this.handleCheckout} increase={this.handleIncrease} decrease={this.handleDecrease} />
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default PrescribeDrug;
