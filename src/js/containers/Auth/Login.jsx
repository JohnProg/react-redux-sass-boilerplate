import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import logIn from './../../actions/authActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  addNotification(msg, level) {
    this.notificationSystemRef.addNotification({
      message: msg,
      level,
    });
  }

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    // Make validations
    if (email === '') {
      this.addNotification('Email field is required', 'error');
      return;
    }

    if (!this.validateEmail(email)) {
      this.addNotification('Email field is not vaid format', 'error');
      return;
    }

    this.setState({ isLoading: true });
    try {
      await this.props.dispatch(logIn({ email, password }));
      this.addNotification('Login successful', 'success');
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
      this.addNotification(error, 'error');
    }
  }

  render() {
    const { isLoading, email, password } = this.state;

    return (
      <section>
        <NotificationSystem
          ref={notificationSystem => (this.notificationSystemRef = notificationSystem)}
        />
        {
          isLoading ? <p>Loading</p> : null
        }
        <form onSubmit={this.handleSubmit}>
          <input
            name="email"
            type="text"
            value={email}
            onChange={this.handleChange}
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <button>Save</button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
