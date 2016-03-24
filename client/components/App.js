// TODO: validate PropTypes
import React, { PropTypes } from 'react';
import Greeting from './Greeting';
import Sidebar from './Sidebar';
import Loading from './Loading';

/*
 * Define App element to be conditionally rendered after Ajax call is done
 * TODO: Refactor conditional rendering
 * Renders manager if no hooks
 * Renders eventlist if there are repos
 */
const LoadedApp = ({ firstName, username, hooks, children, manager, main }) => (
  <div>
    <Greeting user={firstName}/>
    <div className="app-container">
      <Sidebar user={username}/>
      <div className="main-view-container">
        { !children && !hooks.length && manager }
        { (children && hooks && main) || children }
      </div>
    </div>
  </div>
);

// verticalCenter Style for Loading element
const verticalCenter = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  marginLeft: '-60px', /* negative half of the width */
  marginTop: '-40px', /* negative half of the height */
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isFetching, firstName } = this.props;

    return (
      <div>
      { isFetching && !firstName ?
        <Loading style={verticalCenter}/> : <LoadedApp {...this.props}/> }
      </div>
    );
  }
}

LoadedApp.propTypes = {
  firstName: PropTypes.string,
  username: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.components),
  hooks: PropTypes.arrayOf(PropTypes.string),
  main: PropTypes.object,
  manager: PropTypes.object,
};

App.propTypes = LoadedApp.propTypes;

App.propTypes.isFetching = PropTypes.bool.isRequired;
export default App;
