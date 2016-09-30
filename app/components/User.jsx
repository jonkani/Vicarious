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

  handleConfirmBlur() {
    const nextErrors = Object.assign({}, this.state.errors);

    if (this.state.reg.password !== this.state.reg.confirm) {
      nextErrors.reg.confirm = 'Danger: Passwords do not match!';

      return this.setState({ errors: nextErrors });
    }

    delete nextErrors.reg.confirm;

    this.setState({ errors: nextErrors });
  },

  handleRegister(event) {
    event.preventDefault();

    const result = Joi.validate(this.state.reg, schema, {
      abortEarly: false,
      allowUnknown: true
    });
    const nextErrors = Object.assign({}, this.state.errors);

    if (result.error) {
      const message = result.error.message;
      let valError;

      if (message[0] === 'W') {
        valError = { email: message };
      }
      else {
        valError = { password: message };
      }

      nextErrors.reg = valError;

      return this.setState({ errors: nextErrors });
    }
    else if (this.state.reg.password !== this.state.reg.confirm) {
      nextErrors.reg.confirm = 'Danger: Passwords do not match!';

      return this.setState({ errors: nextErrors });
    }

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
      this.props.openToast(`Whoops! ${err}`);
    });
  },

  handleLogin(event) {
    event.preventDefault();

    const result = Joi.validate(this.state.login, schema, {
      abortEarly: false,
      allowUnknown: true
    });

    if (result.error) {
      const message = result.error.message;
      let valError;

      if (message[0] === 'W') {
        valError = { email: message };
      }
      else {
        valError = { password: message };
      }
      const nextErrors = Object.assign({}, this.state.errors);

      nextErrors.login = valError;

      return this.setState({ errors: nextErrors });
    }

    const login = this.state.login;

    axios.post('/api/token', login)
    .then(() => {
      browserHistory.push('/');
    })
    .catch(() => {
      this.props.openToast('Invalid username/password!');
    });
  },

  handleLogout(event) {
    event.preventDefault();

    axios.delete('/api/token')
    .then(() => {
      browserHistory.push('/');
    })
    .catch((err) => {
      this.props.openToast(`Whoops! ${err}`);
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
    const headStyle = {
      fontSize: '3.5rem',
      fontFamily: 'dpcomicregular',
      color: '#fee',
      textShadow: '0 -20px 100px, 0 0 2px, 0 0 1em #fd00ff, 0 0 0.5em #fd00ff, 0 0 0.1em #fd00ff, 0 10px 3px #000',
      width: '100%',
      margin: '0 0',
      textAlign: 'center'
    };
    const errorGen = (topic) => {
      const errName = Object.keys(this.state.errors[topic])[0];

      if (errName) {
        const newStyle = {
          fontSize: '2.5rem',
          textShadow: '0 -20px 100px, 0 0 2px, 0 0 1em #ff0000, 0 0 0.5em #ff0000, 0 0 0.1em #ff0000, 0 10px 3px #000'
        };
        const errStyle = Object.assign({}, headStyle, newStyle);

        return <h2 style={errStyle}>{this.state.errors[topic][errName]}</h2>;
      }

      return <h2 style={headStyle}>
        {topic === 'login' ? 'Login' : 'Register '}
      </h2>;
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
          {errorGen('login')}
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
          {errorGen('reg')}
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
            onBlur={this.handleConfirmBlur}
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
