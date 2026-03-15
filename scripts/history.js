import {
  $historyBody,
  $historyList,
  $historyButton,
  $historyClearButton,
} from "./selectors.js";

const appendHistoryList = (text) => {
  $historyList.insertAdjacentHTML(
    "beforeend",
    `<li class="history__item">
              <h2 class="history__text _text-extra-subtitle">
              ${text}
              </h2>
            </li>`,
  );
  saveHistoryList();
};
const createHistoryItemFromStorage = () => {
  const itemList = loadHistoryList();
  console.log(itemList);

  itemList.forEach((item) => appendHistoryList(item));
};

const createHistoryItem = (
  currency1,
  currency2,
  amount,
  convertResult,
  convertRate,
) => {
  appendHistoryList(
    `${amount} ${currency1} &#x27A4 ${currency2}. Result: ${convertResult.toFixed(2)}. Rate: ${convertRate.toFixed(2)}`,
  );
};

const saveHistoryList = () => {
  let itemsText = [];
  const listCollection = $historyList.children;
  Array.from(listCollection).forEach((element) =>
    itemsText.push(element.innerText),
  );
  localStorage.setItem(`Converted`, JSON.stringify(itemsText));
};

const loadHistoryList = () => {
  return JSON.parse(localStorage.getItem("Converted")) ?? null;
};

const clearHistory = () => {
  Array.from($historyList.children).forEach((child) => child.remove());
  saveHistoryList();
};

const toggleHistory = () => {
  $historyBody.classList.toggle(`_open`);
};

$historyButton.addEventListener("click", toggleHistory);
$historyClearButton.addEventListener("click", clearHistory);

export { loadHistoryList, createHistoryItem, createHistoryItemFromStorage };
