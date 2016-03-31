import React, { PropTypes } from 'react';

class Checkbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
        <label>
          <input type="checkbox" {...this.props} checked={this.state.isChecked}/>
            {this.props.label}
        </label>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Checkbox;
