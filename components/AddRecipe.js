import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Icon, Select, Form, Button } from 'antd';
import AddProductToRecipe from './AddProductToRecipe';
import { addRecipe, getProducts } from '../actions/actions';

const { Option } = Select;
const FormItem = Form.Item;
let uuid = 0;
class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // key: '',
      // products: [],
      value: props.note
    };
    this.confirmNote = this.confirmNote.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.defaultGetValueFromEvent = this.defaultGetValueFromEvent.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }
  remove(k) {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  }

  add() {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // eslint-disable-next-line
    uuid++;
    form.setFieldsValue({
      keys: nextKeys
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  updateInputValue(evt) {
    this.setState({
      value: evt.target.value
    });
  }

  defaultGetValueFromEvent(e) {
    if (!e || !e.target) {
      return e;
    }
    const { target } = e;
    return target.type === 'checkbox' ? target.checked : `${target.value} asdasd`;
  }

  confirmNote() {
    const data =
    {
      value: this.state.value
    };
    this.props.addRecipe(data);
  }
  checkProduct = (rule, value, callback) => {
    if (value.name !== '' && value.product !== '') {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
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
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <FormItem
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Passengers' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
            initialValue: { name: '', product: '' },
            rules: [{ validator: this.checkProduct }]
        })(<AddProductToRecipe products={this.props.products} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </FormItem>
    ));
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" /> Dodaj Składnik
            </Button>
          </FormItem>
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>
        </Form>
        <Input
          className="tag-input"
          placeholder="Note"
          type="text"
          value={this.state.value}
          onChange={evt => this.updateInputValue(evt)}
        />

        <Icon className="icon-hand" onClick={this.confirmNote} type="check" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product
});
const mapDispatchToProps = dispatch => ({
  addRecipe: data => dispatch(addRecipe(data)),
  getProducts: () => dispatch(getProducts())
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
  }).isRequired
};

const WrappedAddRecipe = Form.create()(AddRecipe);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedAddRecipe);
