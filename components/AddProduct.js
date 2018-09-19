import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Form, Button, InputNumber, Col } from 'antd';
import { addProduct } from '../actions/actions';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddProduct extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        this.props.addRecipe(values);
      }
    });
  }

  render() {
    const {
      getFieldDecorator, getFieldsError
    } = this.props.form;

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <h1>Nowy produkt</h1>
        <h3>Nazwa</h3>
        <FormItem>
          {getFieldDecorator('key', {
            rules: [{ required: true, message: 'Podaj nazwę produktu' }]
          })(<Input />)}
        </FormItem>
        <h3>Cena Jednostkowa</h3>
        <FormItem>
          <Col span={2}>
            <FormItem>
              {getFieldDecorator('unitPrice', {})(<InputNumber step={0.01} precision={2} placeholder="zł" />)}
            </FormItem>
          </Col>
          <Col span={2}>
            <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
          zł za
            </span>
          </Col>
          <Col span={11}>
            <FormItem>
              {getFieldDecorator('unitGrams', {})(<InputNumber step={1} precision={0} placeholder="gram" />)}
            </FormItem>
          </Col>
        </FormItem>
        <h3>Waga pełnej szklanki</h3>
        <FormItem>
          {getFieldDecorator('glass', {})(<InputNumber step={1} precision={0} placeholder="szklanka" />)}
        </FormItem>
        <h3>Waga pełnej łyżki</h3>
        <FormItem>
          {getFieldDecorator('bigSpoon', {})(<InputNumber step={1} precision={0} placeholder="łyżka" />)}
        </FormItem>
        <h3>Waga pełnej łyżeczki</h3>
        <FormItem>
          {getFieldDecorator('smallSpoon', {})(<InputNumber step={1} precision={0} placeholder="łyżeczka" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} >Dodaj</Button>
        </FormItem>
      </Form>
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
  addRecipe: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldsValue: PropTypes.func,
    getFieldValue: PropTypes.func,
    setFieldsValue: PropTypes.func,
    setFields: PropTypes.func,
    validateFields: PropTypes.func,
    validateFieldsAndScroll: PropTypes.func,
    getFieldError: PropTypes.func,
    getFieldsError: PropTypes.func,
    isFieldValidating: PropTypes.func,
    isFieldTouched: PropTypes.func,
    isFieldsTouched: PropTypes.func,
    resetFields: PropTypes.func,
    getFieldDecorator: PropTypes.func
  }).isRequired
};

const WrappedAddProductForm = Form.create()(AddProduct);

export default connect(null, mapDispatchToProps)(WrappedAddProductForm);
