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
    this.getMeasurementName = this.getMeasurementName.bind(this);
    this.close = this.close.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
    this.props.getMeasurements();
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
        key: 'measurement',
        render: key => this.getMeasurementName(key)
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
  getMeasurementName(key) {
    if (this.props.measurements.length > 1) {
      return this.props.measurements.find(x => x.key === key).name;
    }
    return key;
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
          <Product
            product={this.state.product}
            close={this.close}
            measurements={this.props.measurements}
            saveProduct={this.props.saveProduct}
          />
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
  measurements: PropTypes.arrayOf(PropTypes.shape()),
  getProducts: PropTypes.func.isRequired,
  saveProduct: PropTypes.func.isRequired,
  getMeasurements: PropTypes.func.isRequired
  /* eslint-enable */
};

ProductsPage.defaultProps = { measurements: [] };

const mapStateToProps = state => ({
  products: state.product,
  measurements: state.measurements
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(actions.getProducts()),
  getMeasurements: () => dispatch(actions.getMeasurements()),
  saveProduct: (data) => {
    dispatch(actions.saveProduct(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
