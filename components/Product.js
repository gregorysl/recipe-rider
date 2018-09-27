import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Form, Button, InputNumber, Col, Switch, Row } from 'antd';
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
    getFieldDecorator('key');
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSubmit}
      >
        <h1>{title} produkt</h1>
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="Nazwa">
              {getFieldDecorator('name', { rules: [{ required: true, message: 'Podaj nazwę produktu' }] })(<Input name="name" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Domyślna miara">
              { /* eslint-disable react/jsx-indent */
            getFieldDecorator('measurement', {
              initialValue: 'grams',
              valuePropName: 'defaultValue',
              rules: [{ required: true, message: 'Podaj domyślną miarę' }]
            })(<MeasurementUnit />)
          /* eslint-enable */}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={2}>
            <FormItem label="Cena Jednostkowa">
              {getFieldDecorator('unitPrice', { rules: [{ required: true, message: 'Podaj wartość dla miary domyślnej' }] })(<InputNumber step={0.01} precision={2} placeholder="zł" />)}
            </FormItem>
          </Col>
          <Col span={2}>
            <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
          zł za
            </span>
          </Col>
          <Col span={11}>
            <FormItem>
              {getFieldDecorator('grams', { rules: [{ required: true, message: 'Podaj wagę produktu' }] })(<InputNumber step={1} precision={0} placeholder="waga" />)}
            </FormItem>
          </Col>
          {product &&
          <Col span={8}>
            <FormItem label="Aktywny">
              {getFieldDecorator('active', { valuePropName: 'checked' })(<Switch />)}
            </FormItem>
          </Col>}
        </Row>

        <h3>Cena Jednostkowa</h3>
        <FormItem />
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
