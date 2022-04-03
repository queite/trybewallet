import { DELETE, EDIT, EDITING, GET_CURRENCIES,
  SAVE_EXPENSE, UPDATE_TOTAL } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  isEditing: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case UPDATE_TOTAL:
    return {
      ...state,
      total: Number.parseFloat(action.total),
    };
  case DELETE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDITING:
    return {
      ...state,
      isEditing: !state.isEditing,
      idToEdit: action.id,
    };
  case EDIT:
    return {
      ...state,
      expenses: state.expenses
        .map((item) => (item.id === action.expense.id ? action.expense : item)),
    };
  default:
    return state;
  }
};

export default wallet;
