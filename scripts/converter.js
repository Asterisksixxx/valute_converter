import { $resultAmount, $resultRate } from "./selectors.js";
import { getCurrencyList } from "./api.js";
import { appendHistoryList, saveHistoryList } from "./history.js";

const getAllCurrency = async () => {
  const currency = await getCurrencyList();
  return Array.from(currency.supported_codes);
};

export { getAllCurrency };
