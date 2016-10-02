import React from 'react';

const Instructions = React.createClass({
  render() {
    return <div className="headcardinstruction">
      <div className="headcardinfotext">
        <span
          style={{
            fontSize: '1.9rem',
            fontFamily: 'dpcomicregular',
            color: '#fd00ff'
          }}
        >
        Welcome to Vicarious!
        </span>
        <br /><br />
        Click on the map to start searching.
        <br /><br />
        When you find an image you'd like to explore, click on the marker on the map or the arrow in the results list and hit the "Go!" button!
        <br /><br />
        If you'd like to save your favorite images, click the user button to sign up!
      </div>
    </div>;
  }
});

export default Instructions;
