import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import Hardware from './Hardware';
import AddProduct from './AddProduct';
import * as actions from '../actions/actions';

const { Header, Content } = Layout;

class App extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }
  render() {
    const data = this.props.table.map(x => (<h2>{x}</h2>));
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content style={{ padding: '0 50px' }} >
          <div style={{ background: '#fff', padding: 5, minHeight: 280 }} >
            <h1>Hardware Monitorasd</h1>
            {data}
            <Hardware />
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
  getRecipes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  table: state.table
});

const mapDispatchToProps = dispatch => ({
  getRecipes: () => dispatch(actions.getRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
