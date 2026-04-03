const API_TOKEN = "4bf0e4420bbf3bfbddf4a694";
const API_URL = "https://v6.exchangerate-api.com/v6/";

const request = async (path) => {
  const response = await fetch(path);
  const responseJson = await response.json();
  return responseJson;
};

const getCurrencyList = () => {
  return request(`${API_URL}${API_TOKEN}/codes`);
};

const getPairCurrency = (currencyFrom, currencyTo) => {
  const currencyFromCode = currencyFrom.split(" ");
  const currencyToCode = currencyTo.split(" ");
  return request(
    `${API_URL}${API_TOKEN}/pair/${currencyFromCode[0]}/${currencyToCode[0]}`,
  );
};

export { getCurrencyList, getPairCurrency };
