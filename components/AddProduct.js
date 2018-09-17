import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Input, InputNumber, Icon } from 'antd';
import { addProduct } from '../actions/actions';


class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      unitPrice: 0
    };
    this.confirmNote = this.confirmNote.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }
  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  }
  handleNumberChange(number) {
    this.setState({
      unitPrice: number
    });
  }

  confirmNote() {
    this.props.addRecipe(this.state);
  }

  render() {
    return (
      <React.Fragment>
        <Row>Nazwa<Input className="tag-input" placeholder="Nazwa" name="key" onChange={this.handleInputChange} type="text" /></Row>
        <Row>Cena jednostkowa<InputNumber name="unitPrice" step={0.01} precision={2} onChange={this.handleNumberChange} /></Row>
        <Icon className="icon-hand" onClick={this.confirmNote} type="check" />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addRecipe: (data) => {
    dispatch(addProduct(data));
  }
});
// AddProduct.defaultProps = { note: '' };

AddProduct.propTypes = {
  // name: PropTypes.string,
  // name: PropTypes.string,
  addRecipe: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(AddProduct);
