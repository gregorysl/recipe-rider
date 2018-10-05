import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Button, Table } from 'antd';
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
    const columns = [
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
    const data = this.props.table.map(x => <h2 key={x.key}>{x.name}</h2>);
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 5, minHeight: 280 }}>
            <h1>Products</h1>
            <Table
              columns={columns}
              dataSource={this.props.products}
              pagination={false}
            />
            <h1>Recipes</h1>
            {data}
            <AddRecipe />
          </div>
          <br />
          <div>
            <Product product={this.state.product} />
          </div>
        </Content>
      </Layout>
    );
  }
}

App.propTypes = {
  /* eslint-disable indent */
  products: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.number.isRequired,
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
  table: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired).isRequired,
  getRecipes: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired
  /* eslint-enable */
};
const mapStateToProps = state => ({
  table: state.table,
  products: state.product
});

const mapDispatchToProps = dispatch => ({
  getRecipes: () => dispatch(actions.getRecipes()),
  getProducts: () => dispatch(actions.getProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
