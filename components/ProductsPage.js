import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import Product from './Product';
import * as actions from '../actions/actions';

const scrollToElement = require('scroll-to-element');

function findProductName(data, key) {
  if (data.length > 1) {
    const product = data.filter(x => x.key === key)[0];
    if (!product) {
      return key;
    }
    return product.name;
  }
  return key;
}
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
    scrollToElement('.product-panel');
  }

  render() {
    const cards = this.props.products.map((x) => {
      const measurement = findProductName(this.props.measurements, x.measurement);
      return (
        <Col key={x.key} xs={24} sm={12} md={8} lg={6} xl={6}>
          <Card title={`${x.name} ${x.unitPrice}zł`} extra={<Button onClick={() => this.handleClick(x)}>Edytuj</Button>}>
            <p><b>Miara</b>: {measurement}</p>
            {x.piece && <p><b>Sztuk</b>: {x.piece}</p>}
            {x.grams && <p><b>Gram</b>: {x.grams}g</p>}
            {x.smallSpoon && <p><b>Łyżeczka</b>: {x.smallSpoon}g</p>}
            {x.bigSpoon && <p><b>Łyżka</b>: {x.bigSpoon}g</p>}
            {x.glass && <p><b>Szklanka</b>: {x.glass}g</p>}
          </Card>
        </Col>);
    });
    return (
      <React.Fragment>
        <h1 className="product-panel">Produkty</h1>
        <Button onClick={() => this.handleClick(null)}>Dodaj</Button>
        {this.state.showProductPanel && (
          <Product
            product={this.state.product}
            close={this.close}
            measurements={this.props.measurements}
            saveProduct={this.props.saveProduct}
          />
        )}
        <Row>
          {cards}
        </Row>
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
  saveProduct: PropTypes.func.isRequired
  /* eslint-enable */
};

ProductsPage.defaultProps = { measurements: [] };

const mapStateToProps = state => ({
  products: state.product,
  measurements: state.measurements
});

const mapDispatchToProps = dispatch => ({
  saveProduct: (data) => {
    dispatch(actions.saveProduct(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
