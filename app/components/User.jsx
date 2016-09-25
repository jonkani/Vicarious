import Joi from 'joi';
import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

const schema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .error(new Error('Warning: Invalid email!')),
  password: Joi.string()
    .trim()
    .min(8)
    .error(new Error('Error: Password must contain 8+ characters!'))
});

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
      },
      errors: { reg: {}, login: {}}
    };
  },

  handleBlur(event) {
    const { name, value } = event.target;
    const topic = name.split('.')[0];
    const key = name.split('.')[1];
    const nextErrors = Object.assign({}, this.state.errors);
    const result = Joi.validate({ [key]: value }, schema);

    if (result.error) {
      nextErrors[topic][key] = result.error.message;

      return this.setState({ errors: nextErrors });
    }

    delete nextErrors[topic][key];

    this.setState({ errors: nextErrors });
  },

  handleRegister(event) {
    event.preventDefault();

    const reg = {
      email: this.state.reg.email,
      password: this.state.reg.password
    };

    axios.post('/api/users', reg)
    .then(() => {
      axios.post('/api/token', reg);
    })
    .then(() => {
      browserHistory.push('/');
    })
    .catch((err) => {
      console.error(err);
    });
  },

  handleLogin(event) {
    event.preventDefault();

    const login = this.state.login;

    axios.post('/api/token', login)
    .then(() => {
      browserHistory.push('/');
    })
    .catch((err) => {
      console.error(err);
    });
  },

  handleLogout(event) {
    event.preventDefault();

    axios.delete('/api/token')
    .then(() => {
      const newLogin = Object.assign(
        {},
        this.state.login,
        { email: '', password: '' }
      );
      const newReg = Object.assign(
        {},
        this.state.login,
        { email: '', password: '', confirm: '' }
      );

      this.setState({ login: newLogin, reg: newReg });
      browserHistory.push('/');
    })
    .catch((err) => {
      console.error(err);
    });
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
    let loginBody;
    if (this.state.errors.keys) {

    }
    const headStyle = {
      fontSize: '3.5rem',
      fontFamily: 'dpcomicregular',
      color: '#fee',
      textShadow: '0 -40px 100px, 0 0 2px, 0 0 1em #fd00ff, 0 0 0.5em #fd00ff, 0 0 0.1em #fd00ff, 0 10px 3px #000',
      width: '100%',
      margin: '0 0',
      textAlign: 'center'
    };

    if (document.cookie) {
      loginBody = <span
        className="logout"
        onClick={this.handleLogout}
      >
        Logout?
      </span>;
    }
    else {
      loginBody = <div className="formcontainer">
        <form className="loginform">
          <h2
            style={headStyle}
          >
            Login
          </h2>
          <input
            name="login.email"
            onBlur={this.handleBlur}
            onChange={this.handleTextChange}
            placeholder="Email"
            type="text"
            value={this.state.login.email}
          />
          <input
            name="login.password"
            onBlur={this.handleBlur}
            onChange={this.handleTextChange}
            placeholder="Password"
            type="password"
            value={this.state.login.password}
          />
          <button onClick={this.handleLogin}>Login</button>
        </form>
        <form className="loginform">
          <h2
            style={headStyle}
          >
            Register
          </h2>
          <input
            name="reg.email"
            onBlur={this.handleBlur}
            onChange={this.handleTextChange}
            placeholder="Email"
            type="text"
            value={this.state.reg.email}
          />
          <input
            name="reg.password"
            onBlur={this.handleBlur}
            onChange={this.handleTextChange}
            placeholder="Password"
            type="password"
            value={this.state.reg.password}
          />
          <input
            name="reg.confirm"
            onChange={this.handleTextChange}
            placeholder="Confirm Password"
            type="password"
            value={this.state.login.confirm}
          />
          <button onClick={this.handleRegister}>Register</button>
        </form>
      </div>;
    }

    return <div className="usercontainer">
      {loginBody}
    </div>;
  }
});

export default User;
