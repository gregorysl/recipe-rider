import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Product from './Product';
import * as actions from '../actions/actions';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Measurement',
    dataIndex: 'measurement',
    key: 'measurement'
  },
  {
    title: 'Grams',
    dataIndex: 'grams',
    key: 'grams'
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice'
  },
  {
    title: 'Big Spoon',
    dataIndex: 'bigSpoon',
    key: 'bigSpoon'
  },
  {
    title: 'Small Spoon',
    dataIndex: 'smallSpoon',
    key: 'smallSpoon'
  },
  {
    title: 'Glass',
    dataIndex: 'glass',
    key: 'glass'
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, product) => (
      <Button onClick={() => this.handleClick(product)}>Edit</Button>
    )
  }
];
const ProductList = ({ products, match }) => (
  <React.Fragment>
    <h1>Products</h1>
    <Link className="ant-btn ant-btn-primary" to={`${match.url}/html`}>
      Dodaj przepis
    </Link>
    <Table columns={columns} dataSource={products} pagination={false} />
  </React.Fragment>
);
ProductList.propTypes = {
  /* eslint-disable indent */
  match: PropTypes.shape().isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      measurement: PropTypes.string.isRequired,
      unitPrice: PropTypes.number.isRequired,
      active: PropTypes.bool,
      bigSpoon: PropTypes.number,
      smallSpoon: PropTypes.number,
      glass: PropTypes.number,
      piece: PropTypes.number,
      grams: PropTypes.number
    }).isRequired).isRequired
  /* eslint-enable */
};
class ProductsPage extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.path}`}
          render={() => <ProductList {...this.props} />}
        />
        <Route
          path={`${this.props.match.path}/html`}
          render={() => <Product product={{}} />}
        />
      </Switch>
    );
  }
}

ProductsPage.propTypes = {
  /* eslint-disable indent */
  match: PropTypes.shape().isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      measurement: PropTypes.string.isRequired,
      unitPrice: PropTypes.number.isRequired,
      active: PropTypes.bool,
      bigSpoon: PropTypes.number,
      smallSpoon: PropTypes.number,
      glass: PropTypes.number,
      piece: PropTypes.number,
      grams: PropTypes.number
    }).isRequired).isRequired,
  getProducts: PropTypes.func.isRequired
  /* eslint-enable */
};
const mapStateToProps = state => ({
  products: state.product
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(actions.getProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
