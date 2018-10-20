import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import ProductsPage from './ProductsPage';
import * as actions from '../actions/actions';

class Main extends Component {
  componentDidMount() {
    this.props.getRecipes();
    this.props.getProducts();
    this.props.getMeasurements();
  }
  render() {
    return (
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/products" component={ProductsPage} />
      </Switch>
    );
  }
}

Main.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired,
  getMeasurements: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  products: state.product,
  measurements: state.measurements
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(actions.getProducts()),
  getMeasurements: () => dispatch(actions.getMeasurements()),
  getRecipes: () => dispatch(actions.getRecipes())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

