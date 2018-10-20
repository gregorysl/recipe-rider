import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Col, Row } from 'antd';
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
  constructor(props) {
    super(props);

    this.state = {
      recipe: null,
      showRecipePanel: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.close = this.close.bind(this);
  }
  componentDidMount() {
    this.props.getRecipes();
  }
  close() {
    this.setState({ recipe: null, showRecipePanel: false });
  }
  handleClick(recipe) {
    this.setState({ recipe, showRecipePanel: true });
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
        <Col key={x.key} xs={24} sm={12} md={8} lg={6} xl={6}>
          <Card
            key={x.key}
            title={x.name}
            extra={<Button onClick={() => this.handleClick(x)}>Edytuj</Button>}
          >
            {products}
            <p>{x.details}</p>
          </Card>
        </Col>
      );
    });
    return (
      <React.Fragment>
        <h1>Przepisy</h1>
        <Button onClick={() => this.handleClick()}>Dodaj</Button>

        {this.state.showRecipePanel && (
          <AddRecipe
            recipe={this.state.recipe}
            close={this.close}
            measurements={this.props.measurements}
            saveRecipe={this.props.saveRecipe}
          />
        )}
        <Row>{data}</Row>
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
  saveRecipe: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired
  /* eslint-enable */
};
const mapStateToProps = state => ({
  recipes: state.recipes,
  measurements: state.measurements,
  products: state.product
});

const mapDispatchToProps = dispatch => ({
  getRecipes: () => dispatch(actions.getRecipes()),
  saveRecipe: (data) => {
    dispatch(actions.addRecipe(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
