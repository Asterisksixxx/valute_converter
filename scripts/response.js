const API_TOKEN = "4bf0e4420bbf3bfbddf4a694";
const API_URL = "https://v6.exchangerate-api.com/v6/";

const getResponse = async (path) => {
  const response = await fetch(path);
  const responseJson = await response.json();
  return responseJson;
};

const getAllCurrencyURI = () => {
  return getResponse(`${API_URL}${API_TOKEN}/codes`);
};

const getPairCurrencyURI = (currency1, currency2) => {
  return getResponse(`${API_URL}${API_TOKEN}/pair/${currency1}/${currency2}`);
};

export { getAllCurrencyURI, getPairCurrencyURI };
