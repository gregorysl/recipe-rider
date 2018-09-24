import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Form, Button, InputNumber, Col, Switch } from 'antd';
import { saveProduct } from '../actions/actions';
import MeasurementUnit from './MeasurementUnit';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Product extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        this.props.saveProduct(values);
      }
    });
  }

  render() {
    const {
      product, form: { getFieldDecorator, getFieldsError }
    } = this.props;
    const title = product ? 'Edytuj' : 'Dodaj';
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <h1>{title} produkt</h1>
        <FormItem>
          {getFieldDecorator('key', {})(<Input name="key" />)}
        </FormItem>
        <h3>Nazwa</h3>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Podaj nazwę produktu' }]
          })(<Input name="name" />)}
        </FormItem>
        {product &&
          (
          <React.Fragment><h3>Aktywny</h3>
            <FormItem>
              {getFieldDecorator('active', { valuePropName: 'checked' })(<Switch />)}
            </FormItem>
          </React.Fragment>)}
        <h3>Domyślna miara</h3>
        <FormItem>
          { /* eslint-disable react/jsx-indent */
            getFieldDecorator('measurement', { initialValue: 'grams', valuePropName: 'defaultValue' })(<MeasurementUnit />)
          /* eslint-enable */}
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
              {getFieldDecorator('grams', {})(<InputNumber step={1} precision={0} placeholder="waga" />)}
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
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} >Zapisz</Button>
        </FormItem>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveProduct: (data) => {
    dispatch(saveProduct(data));
  }
});
Product.defaultProps = { product: {} };

Product.propTypes = {
  product: PropTypes.shape(),
  saveProduct: PropTypes.func.isRequired,
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

const WrappedAddProductForm = Form.create({
  mapPropsToFields(props) {
    const formProduct = {};
    if (props.product != null) {
      Object.entries(props.product).forEach(([k, v]) => {
        formProduct[k] = Form.createFormField({ value: v });
      });
    }
    return formProduct;
  }
})(Product);

export default connect(null, mapDispatchToProps)(WrappedAddProductForm);
