import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Icon, Select } from 'antd';
import { addRecipe } from '../actions/actions';


const InputGroup = Input.Group;
const { Option } = Select;

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.note
    };
    this.confirmNote = this.confirmNote.bind(this);
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
    return (
      <React.Fragment>
        <Input
          className="tag-input"
          placeholder="Note"
          type="text"
          value={this.state.value}
          onChange={evt => this.updateInputValue(evt)}
        />
        <InputGroup compact>
          <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
          <Select defaultValue="Zhejiang">
            <Option value="Zhejiang">Zhejiang</Option>
            <Option value="Jiangsu">Jiangsu</Option>
          </Select>
        </InputGroup>
        <Icon className="icon-hand" onClick={this.confirmNote} type="check" />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addRecipe: (data) => {
    dispatch(addRecipe(data));
  }
});
AddProduct.defaultProps = { note: '' };

AddProduct.propTypes = {
  note: PropTypes.string,
  addRecipe: PropTypes.func.isRequired
};
export default connect(null, mapDispatchToProps)(AddProduct);
