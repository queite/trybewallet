import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Header.css';
import { updateTotal } from '../actions';

class Header extends Component {
  componentDidMount() {
    this.handleTotal();
  }

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (prevProps.expenses !== expenses) {
      this.handleTotal();
    }
  }

  handleTotal = () => {
    const { expenses, dispatch } = this.props;
    const total = expenses.reduce((acc, currentValue) => {
      const cambio = currentValue.value
        * currentValue.exchangeRates[currentValue.currency].ask;
      acc += cambio;
      return acc;
    }, 0);
    dispatch(updateTotal(total.toFixed(2)));
  }

  render() {
    const { userEmail, total } = this.props;
    return (
      <header>
        <h1>
          TRYBE
          <strong>WALLET</strong>
        </h1>
        <section>
          <p data-testid="email-field">{userEmail}</p>
          <div className="total-container">
            <p data-testid="total-field">{total || 0}</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </section>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};
