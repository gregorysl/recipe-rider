import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import MeasurementUnit from './MeasurementUnit';

const { Option } = Select;

class AddProductToRecipe extends Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      name: value.name,
      product: value.product
    };
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
        this.setState({ name: e.target.value });
      }
      this.triggerChange({ name: e.target.value });
    }

    handleProductChange = (product) => {
      if (!('value' in this.props)) {
        this.setState({ product });
      }
      const { measurement } = this.props.products.filter(x => `${x.key}` === product)[0];
      this.setState({ measurement });
      this.triggerChange({ measurement });

      this.triggerChange({ product });
    }
    handleMeasurementChange = (measurement) => {
      if (!('value' in this.props)) {
        this.setState({ measurement });
      }

      this.triggerChange({ measurement });
    }

    triggerChange = (changedValue) => {
      const { onChange } = this.props;
      if (onChange) {
        onChange(Object.assign({}, this.state, changedValue));
      }
    }

    render() {
      const { state } = this;
      const data = this.props.products.map(d => <Option key={d.key}>{d.name}</Option>);
      return (
        <span>
          <Input
            type="text"
            value={state.name}
            onChange={this.handleNameChange}
            style={{ width: '20%', marginRight: '3%' }}
          />
          <Select
            showSearch
            value={state.product}
            placeholder="Składnik"
            optionFilterProp="name"
            onChange={this.handleProductChange}
            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
            style={{ width: 200, marginRight: '3%' }}
          >
            {data}
          </Select >
          <MeasurementUnit
            defaultValue={state.measurement}
            onChange={this.handleMeasurementChange}
            style={{ width: 200 }}
          />
        </span>
      );
    }
}
AddProductToRecipe.defaultProps = { onChange: null };

AddProductToRecipe.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.shape({
    name: PropTypes.string,
    product: PropTypes.string
  }).isRequired
};

export default (AddProductToRecipe);
