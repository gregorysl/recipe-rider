import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, Col, Row } from "antd";
import PropTypes from "prop-types";
import Recipe from "./Recipe";
import { findProductName } from "../helpers";
import * as actions from "../actions/actions";
import "antd/lib/button/style/css";
import "antd/lib/card/style/css";
import "antd/lib/col/style/css";
import "antd/lib/row/style/css";

class RecipesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: null,
      showRecipePanel: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.close = this.close.bind(this);
  }
  close() {
    this.setState({ recipe: null, showRecipePanel: false });
  }
  handleClick(recipe) {
    this.setState({ recipe, showRecipePanel: true });
  }
  render() {
    const { measurements, products, recipes } = this.props;
    const data = recipes.map(x => {
      const productsShow = Object.values(x.products).map(p => (
        <p key={p.product}>
          {p.amount} {findProductName(measurements, p.measurement)}{" "}
          {findProductName(products, p.product)}
        </p>
      ));
      return (
        <Col key={x.key} xs={24} sm={12} md={8} lg={6} xl={6}>
          <Card
            key={x.key}
            title={`${x.name} - cena: ${x.cost}`}
            extra={<Button onClick={() => this.handleClick(x)}>Edytuj</Button>}
          >
            {productsShow}
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
          <Recipe
            recipe={this.state.recipe}
            close={this.close}
            saveRecipe={this.props.saveRecipe}
          />
        )}
        <Row>{data}</Row>
      </React.Fragment>
    );
  }
}

RecipesPage.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  measurements: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveRecipe: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  recipes: state.recipes,
  measurements: state.measurements,
  products: state.product
});

const mapDispatchToProps = dispatch => ({
  saveRecipe: data => {
    dispatch(actions.addRecipe(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesPage);
