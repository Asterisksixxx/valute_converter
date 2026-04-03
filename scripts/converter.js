//todo getConvert(param param) DONE
import { $resultAmount, $resultRate } from "./selectors.js";
import { getPairCurrency, getCurrencyList } from "./response.js";
import { appendHistoryList, saveHistoryList } from "./history.js";

const getAllCurrency = async () => {
  const currency = await getCurrencyList();
  return Array.from(currency.supported_codes);
};

const getConvert = async (currencyFrom, currencyTo, amount) => {
  const response = await getPairCurrency(currencyFrom, currencyTo);
  const convertResult = amount * response.conversion_rate;

  $resultAmount.innerText = `Converted: ${convertResult} ${currencyTo}`;
  $resultRate.innerText = `Rate: ${response.conversion_rate}`;

  const convertItem = {
    currencyFrom: currencyFrom,
    currencyTo: currencyTo,
    convertResult: convertResult,
    convertRate: response.conversion_rate,
    amount: amount,
  };
  saveHistoryList(convertItem);
  appendHistoryList(convertItem);
};
export { getAllCurrency, getConvert };
