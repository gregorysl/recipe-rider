import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import "antd/lib/select/style/css";

const { Option } = Select;

const MeasurementUnit = props => {
  const options = props.data
    ? props.data.map(x => (
        <Option key={x.key} value={x.key}>
          {x.name}
        </Option>
      ))
    : null;
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
  defaultValue: "grams",
  onChange: null
};
MeasurementUnit.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.shape()
};

export default MeasurementUnit;
