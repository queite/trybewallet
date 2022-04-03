import fetchCurrencies from '../services/fetchCurrencies';

export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const DELETE = 'DELETE';
export const EDITING = 'EDITING';
export const EDIT = 'EDIT';

export const actionLogin = (email) => ({ type: LOGIN, email });
export const getCurrenciesAction = (currencies) => ({ type: GET_CURRENCIES, currencies });
export const saveExpenseAction = (expense) => ({ type: SAVE_EXPENSE, expense });
export const updateTotal = (total) => ({ type: UPDATE_TOTAL, total });
export const deleteExpense = (expenses) => ({ type: DELETE, expenses });
export const isEditing = (id) => ({ type: EDITING, id });
export const editExpense = (expense) => ({ type: EDIT, expense }); // tenho que receber aqui o objeto inteiro já modificado

export function getCurrenciesThunk() {
  return async (dispatch) => {
    try {
      const currencies = await fetchCurrencies();
      dispatch(getCurrenciesAction(currencies));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRatesThunk(expense) {
  return async (dispatch, getState) => {
    try {
      const currentState = getState();
      const rates = await fetchCurrencies();
      const expenseAndRates = {
        ...expense,
        exchangeRates: rates,
        id: currentState.wallet.expenses.length,
      };
      dispatch(saveExpenseAction(expenseAndRates));
    } catch (error) {
      console.log(error);
    }
  };
}
