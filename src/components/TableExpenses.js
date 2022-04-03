import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { deleteExpense, isEditing } from '../actions';
import '../styles/TableExpenses.css';

class TableExpenses extends Component {
  handleDelete = (id) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(deleteExpense(newExpenses));
  }

  handleEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(isEditing(id));
  }

  render() {
    const { expenses } = this.props;
    return (
      <section className="table">
        <table>
          <thead>
            <tr className="top">
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const { id, description, tag, method,
                value, currency, exchangeRates } = expense;
              const cambio = (value * exchangeRates[currency].ask).toFixed(2);
              const currencyName = exchangeRates[currency].name.split('/');
              const rate = Number(exchangeRates[currency].ask).toFixed(2);
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{currencyName[0]}</td>
                  <td>{rate}</td>
                  <td>{cambio}</td>
                  <td>Real</td>
                  <td>
                    <AiOutlineEdit
                      data-testid="edit-btn"
                      onClick={ () => this.handleEdit(id) }
                    />
                    <AiOutlineDelete
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.handleDelete(id) }
                    />
                  </td>
                </tr>);
            })}
          </tbody>
        </table>
      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
});

export default connect(mapStateToProps)(TableExpenses);

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number,
  description: PropTypes.string,
  tag: PropTypes.string,
  method: PropTypes.string,
  value: PropTypes.string,
  currency: PropTypes.string,
  exchangeRates: PropTypes.object,
}.isRequired;

// Material consultado:
// https://edrodrigues.com.br/blog/criando-tabelas-com-filtros-%E2%80%8B%E2%80%8Busando-react/#:~:text=Criando%20Uma%20Tabela%20Com%20O,listando%20uma%20linha%20por%20produto.&text=Aqui%2C%20aceitamos%20uma%20variedade%20de,em%20loop%20em%20nossa%20tabela.
