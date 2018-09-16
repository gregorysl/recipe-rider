import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import { addRecipe } from '../actions/actions';

class Hardware extends Component {
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
Hardware.defaultProps = { note: '' };

Hardware.propTypes = {
  note: PropTypes.string,
  addRecipe: PropTypes.func.isRequired
};
export default connect(null, mapDispatchToProps)(Hardware);
