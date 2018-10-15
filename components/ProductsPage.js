import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'antd';
import PropTypes from 'prop-types';
import Product from './Product';
import * as actions from '../actions/actions';

class ProductsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      showProductPanel: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.close = this.close.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }
  getColumns() {
    return [
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
  }
  close() {
    this.setState({ product: null, showProductPanel: false });
  }
  handleClick(product) {
    this.setState({ product, showProductPanel: true });
  }
  render() {
    return (
      <React.Fragment>
        <h1>Products</h1>
        <Button onClick={() => this.handleClick(null)}>Dodaj</Button>
        {this.state.showProductPanel && (
          <Product product={this.state.product} close={this.close} />
        )}
        <Table
          columns={this.getColumns()}
          dataSource={this.props.products}
          pagination={false}
        />
      </React.Fragment>
    );
  }
}
ProductsPage.propTypes = {
  /* eslint-disable indent */
  products: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
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
