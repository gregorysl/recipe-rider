import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

class Main extends Component {
  componentDidMount() {
    this.props.getRecipes();
    this.props.getProducts();
    this.props.getMeasurements();
  }
  render() {
    return <div />;
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
