import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Form, Button, InputNumber, Col, Switch, Row } from 'antd';
import { saveProduct, getMeasurements } from '../actions/actions';
import MeasurementUnit from './MeasurementUnit';

const FormItem = Form.Item;

const mapFilteredNumberFields = (list, filter, decorator) =>
  list.filter(filter).map(item => (
    <FormItem key={item.key} label={item.name}>
      {decorator(item.key, {})(<InputNumber step={1} precision={0} placeholder={item.name} />)}
    </FormItem>
  ));

const defaults = 'grams';
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Product extends Component {
  componentDidMount() {
    this.props.getMeasurements();
  }
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
        this.props.onSave();
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
      <Form className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
        <h1>{title} produkt</h1>
        <Row gutter={24}>
          <Col span={10}>
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
          <Col span={11}>
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
  },
  getMeasurements: () => dispatch(getMeasurements())
});
Product.defaultProps = { product: {}, measurements: [] };

Product.propTypes = {
  product: PropTypes.shape(),
  saveProduct: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
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
  measurements: PropTypes.arrayOf(PropTypes.shape()),
  getMeasurements: PropTypes.func.isRequired
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

const mapStateToProps = state => ({
  measurements: state.measurements
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedAddProductForm);
