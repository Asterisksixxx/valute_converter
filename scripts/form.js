import { getAllCurrency } from "./converter.js";
import {
  $selectFrom,
  $selectTo,
  $resultAmount,
  $resultRate,
} from "./selectors.js";
import { getPairCurrency } from "./api.js";
import { saveHistoryList, appendHistoryList } from "./history.js";

const appendSelectListOption = (option) => {
  const [code, name] = option;

  $selectFrom.insertAdjacentHTML(
    "beforeend",
    `<option>${code} - ${name}</option>`,
  );
  $selectTo.insertAdjacentHTML(
    "beforeend",
    `<option>${code} - ${name}</option>`,
  );
};
const initForm = async () => {
  const currencyList = await getAllCurrency();
  currencyList.forEach(appendSelectListOption);
};

const handleFormSubmit = async (currencyFrom, currencyTo, amount) => {
  const convertResult = await getConvertResult(
    currencyFrom,
    currencyTo,
    amount,
  );
  console.log(convertResult);
  saveHistoryList(convertResult);
  appendHistoryList(convertResult);

  $resultAmount.innerText = `Converted: ${convertResult.convertAmount} ${currencyTo}`;
  $resultRate.innerText = `Rate: ${convertResult.convertRate}`;
};

const getRate = async (currencyFrom, currencyTo) => {
  const request = await getPairCurrency(currencyFrom, currencyTo);
  return request.conversion_rate;
};

const getConvertResult = async (currencyFrom, currencyTo, amount) => {
  const rate = await getRate(currencyFrom, currencyTo);
  console.log("rate: ", rate);

  const convertItem = {
    currencyFrom: currencyFrom,
    currencyTo: currencyTo,
    convertAmount: rate * amount,
    convertRate: rate,
    amount: amount,
  };

  return convertItem;
};

export { initForm, handleFormSubmit };
