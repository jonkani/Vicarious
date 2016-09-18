import React from 'react';

const User = React.createClass({
  getInitialState() {
    return {
      login: {
        email: '',
        password: ''
      },
      reg: {
        email: '',
        password: '',
        confirm: ''
      }
    };
  },

  handleTextChange(event) {
    const target = event.target.name.split('.')[0];
    const name = event.target.name.split('.')[1];

    const nextUser = Object.assign({}, this.state[target], {
      [name]: event.target.value
    });

    this.setState({ [target]: nextUser });
  },

  render() {
    return <div className="usercontainer">
      <form className="loginform">
        <input
          name="login.email"
          onChange={this.handleTextChange}
          placeholder="Email"
          type="text"
        />
        <input
          name="login.password"
          onChange={this.handleTextChange}
          placeholder="Password"
          type="password"
        />
        <button>Submit</button>
      </form>
      <form className="regform">
        <input
          name="reg.email"
          onChange={this.handleTextChange}
          placeholder="Email"
          type="text"
        />
        <input
          name="reg.password"
          onChange={this.handleTextChange}
          placeholder="Password"
          type="password"
        />
        <input
          name="reg.confirm"
          onChange={this.handleTextChange}
          placeholder="Confirm Password"
          type="password"
        />
        <button>Submit</button>
      </form>
    </div>;
  }
});

export default User;
