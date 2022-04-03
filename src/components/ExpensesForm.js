import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRatesThunk, editExpense, isEditing } from '../actions';
import '../styles/ExpensesForm.css';

class ExpensesForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleExpense = () => {
    const { dispatch } = this.props;
    dispatch(getRatesThunk(this.state));

    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  handleEdit = () => {
    const { dispatch, idToEdit, expenses } = this.props;
    const expenseToEdit = expenses.filter((expense) => expense.id === idToEdit);
    const { value, description, currency, method, tag } = this.state;
    const editedExpense = {
      value,
      description,
      currency,
      method,
      tag,
      id: idToEdit,
      exchangeRates: expenseToEdit[0].exchangeRates,
    };
    dispatch(editExpense(editedExpense));
    dispatch(isEditing());

    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const { currencies, isEditingStatus } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="form-container">
        <label htmlFor="value">
          Valor
          <input
            data-testid="value-input"
            type="text"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleInput }
          />
        </label>

        <label htmlFor="description">
          Descrição
          <input
            data-testid="description-input"
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleInput }
          />
        </label>

        <label htmlFor="currencyExpense">
          Moeda
          <select
            id="currencyExpense"
            name="currency"
            value={ currency }
            onChange={ this.handleInput }
            data-testid="currency-input"
          >
            {currencies.map((coin, index) => (
              <option key={ index } value={ coin }>{coin}</option>
            ))}
          </select>
        </label>

        <label htmlFor="payment">
          Forma de pagamento
          <select
            data-testid="method-input"
            id="payment"
            name="method"
            value={ method }
            onChange={ this.handleInput }
          >
            <option value="">Selecione</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleInput }
          >
            <option value="">Selecione</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ isEditingStatus ? this.handleEdit : this.handleExpense }
        >
          {isEditingStatus ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  isEditingStatus: state.wallet.isEditing,
});

export default connect(mapStateToProps)(ExpensesForm);

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  idToEdit: PropTypes.number,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditingStatus: PropTypes.bool.isRequired,
};

ExpensesForm.defaultProps = {
  idToEdit: 0,
};
