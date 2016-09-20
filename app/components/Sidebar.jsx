import React from 'react';
import { browserHistory } from 'react-router';

const Sidebar = React.createClass({
  handleRadio(event) {
    const size = Number.parseInt(event.target.value);

    this.props.setSize(size);
  },

  handleButton() {
    if (this.props.location === '/user') {
      return browserHistory.push('/');
    }
    browserHistory.push('/user');
  },

  render() {
    const ledStyle = this.props.location === '/user'
      ? {
        backgroundColor: '#F00',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0 -1px 5px 1px, inset #441313 0 -1px 7px, rgba(255, 0, 0, 1) 0 2px 14px'
      }
      : {};

    return <div className="buttoncontainer">
      <div className="logodiv"><img src="http://cdn.techgyd.com/eye-bee-m.jpg" style={{ width: '50%', marginTop: '10%' }} /></div>
      <div className="buttondiv">
      <span style={{fontFamily: 'furoreregular'}}>user</span>
        <div className="led" style={ledStyle} />
        <a
          className="button tick"
          onTouchTap={this.handleButton}
        />
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
