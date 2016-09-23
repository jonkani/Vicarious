import React from 'react';
import { browserHistory } from 'react-router';
const Sidebar = React.createClass({
  handleSize(event) {
    if (event.target.innerHTML === 'small') {
      this.props.setSize(2);
    }
    else {
      this.props.setSize(7);
    }
  },

  handleSwitch() {
    if (this.props.searchSize === 7) {
      this.props.setSize(2);
    }
    else {
      this.props.setSize(7);
    }
  },

  handleButton() {
    if (this.props.location === '/user') {
      return browserHistory.push('/');
    }
    browserHistory.push('/user');
  },

  render() {
    const deg = this.props.searchSize === 2
      ? '-45deg'
      : '-135deg';
    const pointer = {
      cursor: 'pointer'
    };
    const arrowStyle = {
      position: 'absolute',
      top: '50%',
      left: '75%',
      width: '25%',
      height: '4px',
      marginTop: '-2px',
      backgroundColor: '#fefefe',
      borderRadius: '2px',
      transition: 'all 200ms ease-in-out',
      transform: `rotate(${deg})`,
      transformOrigin: '-100% 50%',
      boxShadow: '1px -1px 0px 0px rgba(#111, 0.2)'
    };
    const dialLabelStyle = {
      color: '#282724',
      opacity: 0.4,
      marginTop: '5%'
    };
    const userLabelStyle = {
      marginRight: '5%',
      marginLeft: '14%'
    };

    const ledStyle = this.props.location === '/user'
      ? {
        backgroundColor: '#F00',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0 -1px 5px 1px, inset #441313 0 -1px 7px, rgba(255, 0, 0, 1) 0 2px 14px'
      }
      : {};

    return <div className="buttoncontainer">
      <div className="logodiv">
        <div className="logobox">
          <span className="logotext">VR</span>
        </div>
      </div>
      <div className="buttondiv">
        <div className="ledcontainer">
          <span className="sidebarlabel" style={userLabelStyle}>user</span>
          <div className="led" style={ledStyle} />
        </div>
        <a
          className="button"
          onTouchTap={this.handleButton}
        />
        <div className="dialcontainer">
          <div className="diallabelcontainer">
            <a
              className="sidebarlabel"
              onTouchTap={this.handleSize}
              style={pointer}
            >
              large
            </a>
            <a
              className="sidebarlabel"
              onTouchTap={this.handleSize}
              style={pointer}
            >
              small
            </a>
          </div>
          <div className="dial" onTouchTap={this.handleSwitch}>
            <div style={arrowStyle} />
          </div>
          <a
            className="sidebarlabel"
            style={dialLabelStyle}
          >
            search radius
          </a>
        </div>
      </div>
    </div>;
  }
});

export default Sidebar;
