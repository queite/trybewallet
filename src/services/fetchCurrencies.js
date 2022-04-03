const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrencies = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default fetchCurrencies;
