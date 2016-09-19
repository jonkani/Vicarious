import React from 'react';
import { browserHistory } from 'react-router';

const Sidebar = React.createClass({
  handleRadio(event) {
    const size = Number.parseInt(event.target.value);

    this.props.setSize(size);
  },

  render() {
    return <div className="buttoncontainer">
      <div className="logodiv"><img src="http://cdn.techgyd.com/eye-bee-m.jpg" style={{ width: '50%', marginTop: '10%' }} /></div>
      <div className="buttondiv">
        <button
          onTouchTap={() => (browserHistory.push('/user'))}
        >
          user
        </button>
        <form>
          <input
            defaultChecked="true"
            id="small"
            name="searchSize"
            onTouchTap={this.handleRadio}
            type="radio"
            value="2"
          />
          <label htmlFor="small">Small</label>
          <input
            id="medium"
            name="searchSize"
            onTouchTap={this.handleRadio}
            type="radio"
            value="5"
          />
          <label htmlFor="medium">Medium</label>
          <input
            id="large"
            name="searchSize"
            onTouchTap={this.handleRadio}
            type="radio"
            value="10"
          />
          <label htmlFor="large">Large</label>
        </form>
      </div>
    </div>;
  }
});

export default Sidebar;
