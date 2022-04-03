import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionLogin } from '../actions';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      email: '',
      password: '',
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.loginValidation);
  }

  loginValidation = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+/i;

    if (emailRegex.test(email) && password.length >= minLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleLogin = () => {
    const { history, sendLogin } = this.props;
    const { email } = this.state;
    sendLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <section className="login-container">
        <label htmlFor="email">
          E-mail:
          <input
            data-testid="email-input"
            type="text"
            name="email"
            onChange={ this.handleInput }
            value={ email }
            id="email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ this.handleInput }
            value={ password }
            id="password"
          />
        </label>
        <button
          disabled={ isDisabled }
          type="button"
          onClick={ this.handleLogin }
        >
          Entrar
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (state) => dispatch(actionLogin(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendLogin: PropTypes.func.isRequired,
};
