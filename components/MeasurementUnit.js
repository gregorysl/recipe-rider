import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';


const { Option } = Select;

const MeasurementUnit = props => (
  <Select style={props.style} onChange={props.onChange} value={props.defaultValue} >
    <Option value="grams">Gramy</Option>
    <Option value="glass">Szklanka</Option>
    <Option value="bigSpoon">Duża łyżeczka</Option>
    <Option value="smallSpoon">Mała łyżeczka</Option>
  </Select>
);

MeasurementUnit.defaultProps = {
  style: {}
};
MeasurementUnit.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.shape()
};

export default MeasurementUnit;
