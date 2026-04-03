import {
  $historyBody,
  $historyList,
  $historyButton,
  $historyClearButton,
} from "./selectors.js";

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
const createHistoryItem = () => {
  const historyList = fetchHistory();
  historyList?.forEach((item) => appendHistoryList(item));
};

const saveHistoryList = (convertItem) => {
  const data = localStorage.getItem("Converted");
  const historyList = data ? JSON.parse(data) : [];
  const updatedList = [...historyList, convertItem];
  localStorage.setItem("Converted", JSON.stringify(updatedList));
  console.log(updatedList);
};

const fetchHistory = () => {
  const historyList = JSON.parse(localStorage.getItem("Converted")) ?? null;
  return historyList;
};

const clearHistory = () => {
  Array.from($historyList.children).forEach((child) => child.remove());
  localStorage.removeItem("Converted");
};

const toggleHistory = () => {
  $historyBody.classList.toggle(`history__body_open`);
};

$historyButton.addEventListener("click", toggleHistory);
$historyClearButton.addEventListener("click", clearHistory);

export { fetchHistory, appendHistoryList, createHistoryItem, saveHistoryList };
