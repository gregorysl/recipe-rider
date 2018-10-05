import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Form, Button, InputNumber, Col, Switch, Row } from 'antd';
import { saveProduct } from '../actions/actions';
import MeasurementUnit from './MeasurementUnit';
import { measurementTypes } from '../api/api';

const FormItem = Form.Item;

const defaults = 'grams';
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
  };

  render() {
    const {
      product,
      form: { getFieldDecorator, getFieldsError, getFieldValue }
    } = this.props;
    const title = product ? 'Edytuj' : 'Dodaj';
    const gfv = getFieldValue('measurement');
    const selectedValue = gfv || defaults;
    debugger;
    const products = measurementTypes.filter(x => x.key === selectedValue)[0];
    const mains = products.main ? products.key : products.parent;
    const main = measurementTypes.filter(x => x.key === mains).map(x => (
      <FormItem key={x.key} label={x.name}>
        {/* eslint-disable max-len */}
        {getFieldDecorator(x.key, {})(<InputNumber step={1} precision={0} placeholder={x.name} />)}
        {/* eslint-enable */}
      </FormItem>
    ));
    const additional = measurementTypes
      .filter(x => x.parent === mains)
      .map(x => (
        <FormItem key={x.key} label={x.name}>
          {/* eslint-disable max-len */}
          {getFieldDecorator(x.key, {})(<InputNumber step={1} precision={0} placeholder={x.name} />)}
          {/* eslint-enable */}
        </FormItem>
      ));
    getFieldDecorator('key');
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
        <h1>{title} produkt</h1>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="Nazwa">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Podaj nazwę produktu' }]
              })(<Input name="name" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Domyślna miara">
              {/* eslint-disable react/jsx-indent */
              getFieldDecorator('measurement', {
                initialValue: defaults,
                valuePropName: 'defaultValue',
                rules: [{ required: true, message: 'Podaj domyślną miarę' }]
              })(<MeasurementUnit />)
              /* eslint-enable */
              }
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={2}>
            <FormItem label="Cena Jednostkowa">
              {getFieldDecorator('unitPrice', {
                rules: [
                  {
                    required: true,
                    message: 'Podaj wartość dla miary domyślnej'
                  }
                ]
              })(<InputNumber step={0.01} precision={2} placeholder="zł" />)}
            </FormItem>
          </Col>
          <Col span={2}>
            <span
              style={{
                display: 'inline-block',
                width: '100%',
                textAlign: 'center'
              }}
            >
              zł za
            </span>
          </Col>
          <Col span={11}>{main}</Col>
          {product && (
            <Col span={8}>
              <FormItem label="Aktywny">
                {getFieldDecorator('active', { valuePropName: 'checked' })(<Switch />)}
              </FormItem>
            </Col>
          )}
        </Row>

        {additional}

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Zapisz
          </Button>
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

export default connect(
  null,
  mapDispatchToProps
)(WrappedAddProductForm);
