import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { measurementTypes } from '../api/api';

const { Option } = Select;

const options = measurementTypes.map(x => (
  <Option key={x.key} value={x.key}>
    {x.name}
  </Option>
));

const MeasurementUnit = props => (
  <Select
    style={props.style}
    onChange={props.onChange}
    value={props.defaultValue}
  >
    {options}
  </Select>
);

MeasurementUnit.defaultProps = {
  style: {},
  defaultValue: 'grams',
  onChange: null
};
MeasurementUnit.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.shape()
};

export default MeasurementUnit;
