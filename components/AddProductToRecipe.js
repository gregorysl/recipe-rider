import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

const { Option } = Select;

class AddProductToRecipe extends Component {
  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      name: value.name,
      product: value.product
    };
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
      this.triggerChange({ product });
    }

    triggerChange = (changedValue) => {
      const { onChange } = this.props;
      if (onChange) {
        onChange(Object.assign({}, this.state, changedValue));
      }
    }

    render() {
      const { state } = this;
      const data = this.props.products.map(d => <Option key={d.key}>{d.key}</Option>);
      return (
        <span>
          <Input
            type="text"
            value={state.name}
            onChange={this.handleNameChange}
            style={{ width: '65%', marginRight: '3%' }}
          />
          <Select
            showSearch
            value={state.product}
            placeholder="Składnik"
            optionFilterProp="key"
            onChange={this.handleProductChange}
            filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
            style={{ width: 200 }}
          >
            {data}
          </Select>
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
