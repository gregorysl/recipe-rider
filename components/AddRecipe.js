import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Icon, Form, Button } from 'antd';
import AddProductToRecipe from './AddProductToRecipe';
import { addRecipe, getProducts, getMeasurements } from '../actions/actions';

const { TextArea } = Input;

const FormItem = Form.Item;
let uuid = 0;
class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = { productKeys: [] };
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
    this.props.getMeasurements();
  }

  remove(k) {
    const { productKeys } = this.state;
    if (productKeys.length === 1) {
      return;
    }
    this.setState({
      productKeys: productKeys.filter(key => key !== k)
    });
  }

  add() {
    const { productKeys } = this.state;
    const nextKeys = productKeys.concat(uuid);
    // eslint-disable-next-line
    uuid++;
    this.setState({
      productKeys: nextKeys
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        this.props.addRecipe(values);
      }
    });
  }

  checkProduct = (rule, value, callback) => {
    if (value.name !== '' && value.product !== '') {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    const { productKeys } = this.state;
    const formItems = productKeys.map(k => (
      <FormItem {...formItemLayout} required={false} key={k}>
        {/* eslint-disable  */
        getFieldDecorator(`products[${k}]`, {
          rules: [{ validator: this.checkProduct }]
        })(
          <AddProductToRecipe
            measurements={this.props.measurements}
            products={this.props.products}
          />
        )
        /* eslint-enable */
        }
        {productKeys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={productKeys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </FormItem>
    ));
    return (
      <div style={{ width: '50%' }}>
        <h1>Dodaj przepis</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Nazwa" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Tytuł przepisu jest wymagany!' }
              ]
            })(<Input placeholder="Nazwa" type="text" />)}
          </FormItem>
          <FormItem {...formItemLayout}>
            <Button type="dashed" onClick={this.add}>
              <Icon type="plus" /> Dodaj Składnik
            </Button>
          </FormItem>
          {formItems}
          <FormItem label="Kroki" {...formItemLayout}>
            {getFieldDecorator('details', {
              rules: [
                { required: true, message: 'Kroki przepisu są wymagane!' }
              ]
            })(<TextArea rows={5} />)}
          </FormItem>
          <FormItem {...formItemLayout}>
            <Button type="primary" htmlType="submit">
              Zapisz
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product,
  measurements: state.measurements
});
const mapDispatchToProps = dispatch => ({
  addRecipe: data => dispatch(addRecipe(data)),
  getProducts: () => dispatch(getProducts()),
  getMeasurements: () => dispatch(getMeasurements())
});
AddRecipe.defaultProps = { note: '' };

AddRecipe.propTypes = {
  note: PropTypes.string,
  addRecipe: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  getProducts: PropTypes.func.isRequired,
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
  measurements: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getMeasurements: PropTypes.func.isRequired
};

const WrappedAddRecipe = Form.create()(AddRecipe);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedAddRecipe);
