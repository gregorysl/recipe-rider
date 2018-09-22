import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';


const { Option } = Select;

const MeasurementUnit = props => (
  <Select onChange={props.onChange} value={props.defaultValue} >
    <Option value="grams">Gramy</Option>
    <Option value="glass">Szklanka</Option>
    <Option value="bigSpoon">Duża łyżeczka</Option>
    <Option value="smallSpoon">Mała łyżeczka</Option>
  </Select>
);

// MeasurementUnit.defaultProps = {
//   defaultValue: ''
// };
MeasurementUnit.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MeasurementUnit;