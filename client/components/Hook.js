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
    const { full_name, name, owner, createHook } = this.props;
    const repo = {
      name,
      owner,
      full_name
    };
    const createHookWithRepo = createHook.bind(this, repo);

    return (
      <li className={`hook-container${this.state.isActive ? ' selected' : ''}`}>
          <CreateHookButton createHook={createHookWithRepo} isActive={this.state.isActive}/>
          <a className="repo name" onClick={this.toggleEvents}>{ full_name }</a>
          { this.state.isActive && <HookEvents/> }
      </li>
    );
  }
}

Hook.propTypes = {
  full_name: PropTypes.string.isRequired,
  createHook: PropTypes.func.isRequired,
};

export default Hook;
