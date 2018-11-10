import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Select } from "antd";
import MeasurementUnit from "./MeasurementUnit";
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
  }

  componentWillReceiveProps(nextProps) {
    if ("value" in nextProps) {
      const { value } = nextProps;
      this.setState(value);
    }
  }

  handleProductChange = product => {
    const { measurement } = this.props.products.filter(
      x => x.key === product
    )[0];

    this.triggerChange({ product, measurement });
  };

  handleAmountChange = e => {
    this.triggerChange({ amount: e.target.value });
  };

  handleMeasurementChange = measurement => {
    this.triggerChange({ measurement });
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { state } = this;
    const { currentProducts } = this.props;
    const currentKeys = currentProducts.map(x => (!x ? null : x.product));
    const availableOptions = this.props.products
      .filter(x => x.key === state.product || currentKeys.indexOf(x.key) === -1)
      .map(d => <Option key={d.key}>{d.name}</Option>);
    return (
      <span>
        <Select
          showSearch
          value={state.product}
          placeholder="Składnik"
          optionFilterProp="name"
          onChange={this.handleProductChange}
          filterOption={(input, option) =>
            option.props.children.indexOf(input) >= 0
          }
          style={{ width: "40%", marginRight: "2%" }}
        >
          {availableOptions}
        </Select>
        {state.product && (
          <Input
            type="number"
            placeholder="Wartość"
            value={state.amount}
            onChange={this.handleAmountChange}
            style={{ width: "20%", marginRight: "2%" }}
          />
        )}
        {state.product && (
          <MeasurementUnit
            data={this.props.measurements}
            defaultValue={state.measurement}
            onChange={this.handleMeasurementChange}
            style={{ width: "30%", marginRight: "1%" }}
          />
        )}
      </span>
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
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.shape({
    amount: PropTypes.string,
    product: PropTypes.string
  })
};

export default AddProductToRecipe;
