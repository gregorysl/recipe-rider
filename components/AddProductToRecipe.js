import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import MeasurementUnit from './MeasurementUnit';

const { Option } = Select;

class AddProductToRecipe extends Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = { ...value };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { value } = nextProps;
      this.setState(value);
    }
  }

  handleNameChange = (e) => {
    if (!('value' in this.props)) {
      this.setState({ amount: e.target.value });
    }
    this.triggerChange({ amount: e.target.value });
  };

  handleProductChange = (product) => {
    if (!('value' in this.props)) {
      this.setState({ product });
    }
    const { measurement } = this.props.products.filter(x => `${x.key}` === product)[0];
    this.setState({ measurement });
    this.triggerChange({ measurement });

    this.triggerChange({ product });
  };
  handleMeasurementChange = (measurement) => {
    if (!('value' in this.props)) {
      this.setState({ measurement });
    }

    this.triggerChange({ measurement });
  };

  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { state } = this;
    const data = this.props.products.map(d => (
      <Option key={d.key}>{d.name}</Option>
    ));
    const selProd = this.props.products.filter(x => x.key === state.product)[0];
    let value = '';
    if (this.props.measurements.length > 1 && selProd && state.amount) {
      const selMeasurement = this.props.measurements.filter(x => x.key === state.measurement)[0];
      if (selMeasurement.main) {
        value = (state.amount * selProd.unitPrice) / selProd[state.measurement];
      } else {
        const main = this.props.measurements.filter(x => x.key === selMeasurement.parent)[0];
        value =
          (state.amount * selProd[state.measurement] * selProd.unitPrice) /
          selProd[main.key];
      }
    }
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
          style={{ width: '40%', marginRight: '2%' }}
        >
          {data}
        </Select>
        <Input
          type="number"
          placeholder="Wartość"
          value={state.amount}
          onChange={this.handleNameChange}
          style={{ width: '20%', marginRight: '2%' }}
        />
        <MeasurementUnit
          data={this.props.measurements}
          defaultValue={state.measurement}
          onChange={this.handleMeasurementChange}
          style={{ width: '30%', marginRight: '1%' }}
        />
        <h3>{value}</h3>
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
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.shape({
    amount: PropTypes.string,
    product: PropTypes.string
  })
};

export default AddProductToRecipe;
