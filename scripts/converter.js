import {
  $selectInput,
  $selectInput2,
  $form,
  $amount,
  $resultAmount,
  $resultRate,
} from "./selectors.js";
import { getPairCurrencyURI, getAllCurrencyURI } from "./response.js";
import { currencyState, appendSelectList } from "./index.js";
import { createHistoryItem } from "./history.js";

const getAllCurrency = async () => {
  const currency = await getAllCurrencyURI();
  currencyState.list = Array.from(currency.supported_codes);
  appendSelectList();
};

const getConvert = async () => {
  const currency1 = currencyState.list[$selectInput.value][0];
  const currency2 = currencyState.list[$selectInput2.value][0];
  const response = await getPairCurrencyURI(currency1, currency2);
  const convertResult = $amount.value * response.conversion_rate;
  const convertRate = response.conversion_rate;
  $resultAmount.innerText = `Converted: ${convertResult} ${currency2}`;
  $resultRate.innerText = `Rate: ${convertRate}`;
  createHistoryItem(
    currency1,
    currency2,
    $amount.value,
    convertResult,
    convertRate,
  );
};
export { getAllCurrency, getConvert };
