import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Button, InputNumber, Switch } from 'antd';
import MeasurementUnit from './MeasurementUnit';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 16 }
  }
};
const mapFilteredNumberFields = (list, filter, decorator) =>
  list.filter(filter).map(item => (
    <FormItem key={item.key} label={item.name} {...formItemLayout}>
      {decorator(item.key, {})(<InputNumber style={{ width: '100%' }} step={1} precision={0} placeholder={item.name} />)}
    </FormItem>
  ));

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

        Object.keys(values).forEach((key) => {
          if (typeof values[key] === 'undefined') {
            values[key] = null;
          }
        });

        this.props.saveProduct(values);
        this.props.close();
      }
    });
  };

  render() {
    const {
      product,
      form: { getFieldDecorator, getFieldsError, getFieldValue },
      measurements
    } = this.props;
    const title = product ? 'Edytuj' : 'Dodaj';
    const gfv = getFieldValue('measurement');
    const selectedValue = gfv || defaults;
    let main = null;
    let additional = null;
    if (measurements.length > 0) {
      const products = measurements.filter(x => x.key === selectedValue)[0];
      const mains = products.main ? products.key : products.parent;
      main = mapFilteredNumberFields(
        measurements,
        x => x.key === mains,
        getFieldDecorator
      );
      additional = mapFilteredNumberFields(
        measurements,
        x => x.parent === mains,
        getFieldDecorator
      );
    }
    getFieldDecorator('key');
    return (
      <Form className="ant-advanced-search-form" layout="vertical" onSubmit={this.handleSubmit}>
        <h1>{title} produkt</h1>
        <FormItem label="Nazwa" {...formItemLayout}>
          {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Podaj nazwę produktu' }]
              })(<Input name="name" />)}
        </FormItem>
        <FormItem label="Domyślna miara" {...formItemLayout}>
          {/* eslint-disable react/jsx-indent */
              getFieldDecorator('measurement', {
                initialValue: defaults,
                valuePropName: 'defaultValue',
                rules: [{ required: true, message: 'Podaj domyślną miarę' }]
              })(<MeasurementUnit data={measurements} />)
              /* eslint-enable */
              }
        </FormItem>
        <FormItem label="Cena Jednostkowa" {...formItemLayout}>
          {getFieldDecorator('unitPrice', {
                rules: [
                  {
                    required: true,
                    message: 'Podaj wartość dla miary domyślnej'
                  }
                ]
              })(<InputNumber style={{ width: '100%' }} step={0.01} precision={2} placeholder="zł" />)}
        </FormItem>
        {main}
        {product && (
          <FormItem label="Aktywny" {...formItemLayout}>
            {getFieldDecorator('active', { valuePropName: 'checked' })(<Switch />)}
          </FormItem>
          )}

        {additional}

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Zapisz
          </Button>
          <Button onClick={() => this.props.close()}>Anuluj</Button>
        </FormItem>
      </Form>
    );
  }
}

Product.defaultProps = { product: {}, measurements: [] };

Product.propTypes = {
  product: PropTypes.shape(),
  saveProduct: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
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
  }).isRequired,
  measurements: PropTypes.arrayOf(PropTypes.shape())
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

export default WrappedAddProductForm;
