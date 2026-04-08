const API_TOKEN = "4bf0e4420bbf3bfbddf4a694";
const API_URL = "https://v6.exchangerate-api.com/v6/";

const request = async (path) => {
  const response = await fetch(`${API_URL}${API_TOKEN}/${path}`);
  const responseJson = await response.json();

  return responseJson;
};

const getCurrencyList = () => {
  return request("codes");
};

const getPairCurrency = (currencyFrom, currencyTo) => {
  const [fromCode] = currencyFrom.split(" ");
  const [toCode] = currencyTo.split(" ");

  return request(`pair/${fromCode}/${toCode}`);
};

export { getCurrencyList, getPairCurrency };
