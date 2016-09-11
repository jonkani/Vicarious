import React from 'react';
import { withRouter } from 'react-router';

const App = React.createClass({
  render() {
    return <div>
    {React.cloneElement(this.props.children, {})}
    </div>;
  }
});

export default withRouter(App);
