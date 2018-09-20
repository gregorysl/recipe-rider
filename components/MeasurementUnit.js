import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';


const { Option } = Select;

const MeasurementUnit = props => (
  <Select defaultValue={props.defaultValue} >
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
  defaultValue: PropTypes.string.isRequired
};

export default MeasurementUnit;
