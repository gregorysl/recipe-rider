import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import AddRecipe from './AddRecipe';
import AddProduct from './AddProduct';
import * as actions from '../actions/actions';

const { Header, Content } = Layout;

class App extends Component {
  componentDidMount() {
    this.props.getRecipes();
    this.props.getProducts();
  }
  render() {
    const data = this.props.table.map(x => (<h2>{x}</h2>));
    const data2 = this.props.products.map(x => (<h2>Name: {x.key}, price: {x.unitPrice}</h2>));
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
          <div> <AddProduct /></div>
        </Content>
      </Layout>
    );
  }
}

App.propTypes = {
  table: PropTypes.arrayOf(PropTypes.string).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
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
