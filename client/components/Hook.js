import React, { PropTypes } from 'react';
import CreateHookButton from './CreateHookButton';
import HookEvents from './HookEvents';

class Hook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
    this.toggleEvents = this.toggleEvents.bind(this);
  }

  toggleEvents() {
    const current = this.state.isActive;
    this.setState({
      isActive: !current,
    });
  }

  render() {
    const { full_name } = this.props;
    return (
      <li className={`hook-container${this.state.isActive ? ' selected' : ''}`}>
          <CreateHookButton isActive={this.state.isActive}/>
          <a className="repo name" onClick={this.toggleEvents}>{ full_name }</a>
          { this.state.isActive && <HookEvents/> }
      </li>
    );
  }
}

Hook.propTypes = {
  full_name: PropTypes.string.isRequired,
};

export default Hook;
