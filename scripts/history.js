import {
  $historyBody,
  $historyList,
  $historyButton,
  $historyClearButton,
} from "./selectors.js";
import {
  deleteStorageValue,
  getStorageValue,
  setStorageValue,
  STORAGE_KEYS,
} from "./storage.js";

const appendHistoryList = ({
  amount,
  currencyFrom,
  currencyTo,
  convertResult,
  convertRate,
}) => {
  $historyList.insertAdjacentHTML(
    "beforeend",
    `<li class="history__item">
              <h2 class="history__text _text-extra-subtitle">
              ${amount} ${currencyFrom} &#x27A4 ${currencyTo}. Result: ${Number(convertResult).toFixed(2)}. Rate: ${Number(convertRate).toFixed(2)}
              </h2>
            </li>`,
  );
};

const initHistory = () => {
  const historyList = getHistory();
  console.log(typeof historyList, historyList);
  historyList?.forEach((item) => appendHistoryList(item));
};

const saveHistoryList = (convertItem) => {
  const data = getStorageValue(STORAGE_KEYS.HISTORY);
  console.log(data);
  const updatedList = [...data, convertItem];
  setStorageValue(STORAGE_KEYS.HISTORY, updatedList);
  console.log(updatedList);
};

const getHistory = () => {
  return getStorageValue(STORAGE_KEYS.HISTORY);
};

const clearHistory = () => {
  Array.from($historyList.children).forEach((child) => child.remove());
  deleteStorageValue(STORAGE_KEYS.HISTORY);
};

const toggleHistory = () => {
  $historyBody.classList.toggle(`history__body_open`);
};

export {
  getHistory,
  appendHistoryList,
  initHistory,
  saveHistoryList,
  clearHistory,
  toggleHistory,
};
