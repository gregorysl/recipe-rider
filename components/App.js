import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Button } from 'antd';
import PropTypes from 'prop-types';
import AddRecipe from './AddRecipe';
import Product from './Product';
import * as actions from '../actions/actions';

const { Header, Content } = Layout;

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
    this.props.getProducts();
  }
  handleClick(product) {
    this.setState({ product });
  }
  render() {
    const data = this.props.table.map(x => (<h2 key={x.key}>{x.name}</h2>));
    const data2 = this.props.products.map(x => (
      <h3 key={x.key}>
        {Object.entries(x).map(z => (<span key={z[0]}>{z[0]}:{z[1]}, </span>))}
        <Button onClick={() => this.handleClick(x)}>Edit</Button>
      </h3>));
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content style={{ padding: '0 50px' }} >
          <div style={{ background: '#fff', padding: 5, minHeight: 280 }} >
            <h1>Recipes</h1>
            {data}
            <h1>Products</h1>
            {data2}
            <AddRecipe />
          </div>
          <br />
          <div> <Product product={this.state.product} /></div>
        </Content>
      </Layout>
    );
  }
}

App.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool.isRequired,
    bigSpoon: PropTypes.number.isRequired,
    glass: PropTypes.number.isRequired,
    grams: PropTypes.number.isRequired,
    key: PropTypes.number.isRequired,
    measurement: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    smallSpoon: PropTypes.number.isRequired,
    unitPrice: PropTypes.number.isRequired
  }).isRequired).isRequired,
  table: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  getRecipes: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  table: state.table,
  products: state.product
});

const mapDispatchToProps = dispatch => ({
  getRecipes: () => dispatch(actions.getRecipes()),
  getProducts: () => dispatch(actions.getProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
