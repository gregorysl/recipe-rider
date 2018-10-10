import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddRecipe from './AddRecipe';
import Product from './Product';
import * as actions from '../actions/actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getRecipes();
  }
  handleClick(product) {
    this.setState({ product });
  }
  render() {
    const data = this.props.table.map(x => <h2 key={x.key}>{x.name}</h2>);
    return (
      <React.Fragment>
        <h1>Recipes</h1>
        {data}
        <AddRecipe />
        <div>
          <Product product={this.state.product} />
        </div>
      </React.Fragment>
    );
  }
}

/* eslint-disable indent */
App.propTypes = {
  table: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired).isRequired,
  getRecipes: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired
  /* eslint-enable */
};
const mapStateToProps = state => ({
  table: state.table
});

const mapDispatchToProps = dispatch => ({
  getRecipes: () => dispatch(actions.getRecipes())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
