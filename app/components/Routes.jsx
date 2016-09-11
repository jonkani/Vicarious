import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import App from 'components/App';
import React from 'react';
import Search from 'components/Search';

const Routes = React.createClass({
  render() {
    return <Router history={browserHistory}>
      <Route component={App} path="/" >
        <IndexRoute component={Search} />
      </Route>
    </Router>;
  }
});

export default Routes;
