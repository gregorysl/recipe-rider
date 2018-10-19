import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import AddRecipe from './AddRecipe';
import * as actions from '../actions/actions';

function findProductName(data, key) {
  const product = data.filter(x => x.key === key)[0];
  if (!product) {
    return key;
  }
  return product.name;
}
class App extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }
  render() {
    const data = this.props.recipes.map((x) => {
      const products = x.products.map(p => (
        <p key={p.product}>
          {p.amount} {findProductName(this.props.measurements, p.measurement)}{' '}
          {findProductName(this.props.products, p.product)}
        </p>
      ));
      return (
        <Card key={x.key} title={x.name} style={{ width: 300 }}>
          {products}
          <p>{x.details}</p>
        </Card>
      );
    });
    return (
      <React.Fragment>
        <h1>Recipes</h1>
        {data}
        <AddRecipe />
      </React.Fragment>
    );
  }
}

/* eslint-disable indent */
App.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  measurements: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getRecipes: PropTypes.func.isRequired
  /* eslint-enable */
};
const mapStateToProps = state => ({
  recipes: state.recipes,
  measurements: state.measurements,
  products: state.product
});

const mapDispatchToProps = dispatch => ({
  getRecipes: () => dispatch(actions.getRecipes())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
