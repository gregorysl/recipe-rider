import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

const MeasurementUnit = (props) => {
  /* eslint-disable react/jsx-indent */
  const options = props.data
    ? props.data.map(x => (
        <Option key={x.key} value={x.key}>
          {x.name}
        </Option>
    ))
    : null;
  /* eslint-enable */
  return (
    <Select
      style={props.style}
      onChange={props.onChange}
      value={props.defaultValue}
    >
      {options}
    </Select>
  );
};

MeasurementUnit.defaultProps = {
  style: {},
  defaultValue: 'grams',
  onChange: null
};
MeasurementUnit.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.shape()
};

export default MeasurementUnit;
