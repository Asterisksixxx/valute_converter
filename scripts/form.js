import {
  $selectFrom,
  $selectTo,
  $resultAmount,
  $resultRate,
} from "./selectors.js";
import { getPairCurrency, getCurrencyList } from "./api.js";
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
  const currencyList = await getCurrencyList();
  currencyList.forEach(appendSelectListOption);
};

const submitForm = async (currencyFrom, currencyTo, amount) => {
  const convertResult = await getConvertResult(
    currencyFrom,
    currencyTo,
    amount,
  );

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

export { initForm, submitForm };
