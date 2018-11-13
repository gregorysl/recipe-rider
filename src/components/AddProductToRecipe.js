import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Input, Select, Row, Col } from "antd";
import MeasurementUnit from "./MeasurementUnit";
import { filterByKey } from "../helpers";
import "antd/lib/input/style/css";
import "antd/lib/select/style/css";

const { Option } = Select;

class AddProductToRecipe extends Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = { ...value };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ("value" in nextProps) {
      const { value } = nextProps;
      this.setState(value);
    }
  }

  handleProductChange = product => {
    const { measurement } = filterByKey(this.props.products, product);

    this.triggerChange({ product, measurement });
  };

  handleAmountChange = e => {
    this.triggerChange({ amount: e.target.value });
  };

  handleMeasurementChange = measurement => {
    this.triggerChange({ measurement });
  };

  remove = () => {
    this.props.removeClick(this.props.index);
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { state } = this;
    const { currentProducts, productKeys } = this.props;
    const currentKeys = currentProducts.map(x => (!x ? null : x.product));
    const availableOptions = this.props.products
      .filter(x => x.key === state.product || currentKeys.indexOf(x.key) === -1)
      .map(d => <Option key={d.key}>{d.name}</Option>);
    const colums = productKeys > 1 ? { xs: 22, sm: 6 } : { xs: 24, sm: 8 };
    return (
      <Row>
        <Col sm={24} md={8}>
          <Select
            showSearch
            value={state.product}
            placeholder="Składnik"
            optionFilterProp="name"
            onChange={this.handleProductChange}
            filterOption={(input, option) =>
              option.props.children.indexOf(input) >= 0
            }
          >
            {availableOptions}
          </Select>
        </Col>
        {state.product && (
          <Col sm={24} md={8}>
            <Input
              type="number"
              placeholder="Wartość"
              value={state.amount}
              onChange={this.handleAmountChange}
            />
          </Col>
        )}
        {state.product && (
          <Col {...colums}>
            <MeasurementUnit
              data={this.props.measurements}
              defaultValue={state.measurement}
              onChange={this.handleMeasurementChange}
            />
          </Col>
        )}
        {productKeys > 1 && (
          <Col sm={2} md={2}>
            <Button onClick={this.remove} type="danger">
              Usuń
            </Button>
          </Col>
        )}
      </Row>
    );
  }
}
AddProductToRecipe.defaultProps = {
  onChange: null,
  value: {},
  measurements: []
};

AddProductToRecipe.propTypes = {
  measurements: PropTypes.arrayOf(PropTypes.shape()),
  currentProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  productKeys: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  removeClick: PropTypes.func.isRequired,
  value: PropTypes.shape({
    amount: PropTypes.string,
    product: PropTypes.string
  })
};

export default AddProductToRecipe;
