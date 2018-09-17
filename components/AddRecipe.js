import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Icon, Select } from 'antd';
import { addRecipe, getProducts } from '../actions/actions';

const { Option } = Select;

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.note
    };
    this.confirmNote = this.confirmNote.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  updateInputValue(evt) {
    this.setState({
      value: evt.target.value
    });
  }

  confirmNote() {
    const data =
    {
      value: this.state.value
    };
    this.props.addRecipe(data);
  }

  render() {
    const data = this.props.products.map(d => <Option key={d.key}>{d.key}</Option>);
    return (
      <React.Fragment>
        <Input
          className="tag-input"
          placeholder="Note"
          type="text"
          value={this.state.value}
          onChange={evt => this.updateInputValue(evt)}
        />
        <Select
          showSearch
          placeholder="Składnik"
          optionFilterProp="key"
          filterOption={(input, option) => option.props.children.indexOf(input.toLowerCase()) >= 0}

          style={{ width: 200 }}
        >
          {data}
        </Select>
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
  getProducts: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
