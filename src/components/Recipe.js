import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Input, Icon, Form, Button } from "antd";
import AddProductToRecipe from "./AddProductToRecipe";
import "antd/lib/input/style/css";
import "antd/lib/icon/style/css";
import "antd/lib/form/style/css";
import "antd/lib/button/style/css";

const currencyFormatter = require("currency-formatter");
const { TextArea } = Input;

function filterByKey(data, key) {
  const product = data.filter(x => x.key === key);
  if (product.length !== 1) {
    console.log({ data, key, error: "found more than one" });
  }
  return product[0];
}
const FormItem = Form.Item;
let uuid = 0;
class Recipe extends Component {
  constructor(props) {
    super(props);
    const pk = this.props.recipe.productKeys;
    this.state = { productKeys: pk || [] };
    if (pk) {
      uuid = pk.sort()[pk.length - 1] + 1;
    }
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculatePrice = this.calculatePrice.bind(this);
  }

  remove(k) {
    const { productKeys } = this.state;
    if (productKeys.length === 1) {
      return;
    }
    this.setState({
      productKeys: productKeys.filter(key => key !== k)
    });
  }

  add() {
    const { productKeys } = this.state;
    const nextKeys = productKeys.concat(uuid);
    // eslint-disable-next-line
    uuid++;
    this.setState({
      productKeys: nextKeys
    });
  }
  calculatePrice(values) {
    const { measurements, products } = this.props;
    let computedValue = 0;
    values.products.forEach(element => {
      if (!element) return;
      if (measurements.length > 1 && products.length > 1) {
        const selMeasurement = filterByKey(measurements, element.measurement);
        const selProd = filterByKey(products, element.product);
        let value = 0;
        if (selProd && element.amount) {
          if (selMeasurement.main) {
            value =
              (element.amount * selProd.unitPrice) /
              selProd[element.measurement];
          } else {
            const main = filterByKey(measurements, selMeasurement.parent);
            value =
              (element.amount *
                selProd[element.measurement] *
                selProd.unitPrice) /
              selProd[main.key];
          }
          computedValue += value;
        }
      }
    });
    computedValue = currencyFormatter.format(computedValue, { code: "PLN" });
    return computedValue;
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        values.productKeys = this.state.productKeys;
        values.cost = this.calculatePrice(values);
        this.props.saveRecipe(values);
        this.props.close();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    const { recipe, measurements } = this.props;
    const title = recipe.key ? "Edytuj" : "Dodaj";
    const { productKeys } = this.state;
    const formItems = productKeys.map(k => (
      <FormItem label="Produkt" {...formItemLayout} required={false} key={k}>
        {getFieldDecorator(`products[${k}]`, {})(
          <AddProductToRecipe
            currentProducts={this.props.form.getFieldValue("products")}
            measurements={measurements}
            products={this.props.products}
          />
        )}
        {productKeys.length > 1 && (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={productKeys.length === 1}
            onClick={() => this.remove(k)}
          />
        )}
      </FormItem>
    ));
    getFieldDecorator("key");
    return (
      <div>
        <h1>{title} przepis</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Nazwa" {...formItemLayout}>
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Tytuł przepisu jest wymagany!" }
              ]
            })(<Input placeholder="Nazwa" type="text" />)}
          </FormItem>
          <FormItem label=" " colon={false} {...formItemLayout}>
            <Button type="dashed" onClick={this.add}>
              <Icon type="plus" /> Dodaj Składnik
            </Button>
          </FormItem>
          {formItems}
          <FormItem label="Kroki" {...formItemLayout}>
            {getFieldDecorator("details", {
              rules: [
                { required: true, message: "Kroki przepisu są wymagane!" }
              ]
            })(<TextArea rows={5} />)}
          </FormItem>
          <FormItem {...formItemLayout}>
            <Button type="primary" htmlType="submit">
              Zapisz
            </Button>
            <Button onClick={() => this.props.close()}>Anuluj</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product,
  measurements: state.measurements
});
Recipe.defaultProps = { recipe: {} };

Recipe.propTypes = {
  recipe: PropTypes.shape(),
  saveRecipe: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func
  }).isRequired,
  measurements: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

const WrappedRecipe = Form.create({
  mapPropsToFields(props) {
    const form = {};
    if (props.recipe != null) {
      Object.entries(props.recipe).forEach(([k, v]) => {
        if (k !== "products") {
          form[k] = Form.createFormField({ value: v });
        }
      });
      props.recipe.products.forEach((item, idx) => {
        form[`products[${idx}]`] = Form.createFormField({ value: item });
      });
    }
    return form;
  }
})(Recipe);
export default connect(
  mapStateToProps,
  null
)(WrappedRecipe);
