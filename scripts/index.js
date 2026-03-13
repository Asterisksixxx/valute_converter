//Продумать создание history item через localStorage и через форму, хочу 1 функцию на создание .DONE
//Переключение тем
//TODO разделить зависимости js файлов
//Пересмотреть все названия функций
//Исправить шрифты, добавить анимации

import "./response.js";
import { getPairCurrencyURI, getAllCurrencyURI } from "./response.js";

const $selectInput = document.getElementById(`first-currancy`);
const $selectInput2 = document.getElementById(`second-currancy`);
const $form = document.getElementById(`form`);
const $amount = document.getElementById(`amount-input`);
const $resultAmount = document.getElementById(`result-amount`);
const $resultRate = document.getElementById(`result-rate`);
const $historyBody = document.getElementById(`history-body`);
const $historyList = document.getElementById(`history-list`);
const $historyButton = document.getElementById(`history-button`);
const $historyClearButton = document.getElementById(`history-clear`);
const $themeButton = document.getElementById(`utilites-thema-button`);

let currencyList;

const getAllCurrency = async () => {
  const currency = await getAllCurrencyURI();
  currencyList = Array.from(currency.supported_codes);
  appendSelectList();
};

const appendSelectList = () => {
  currencyList.forEach(([code, name], index) => {
    $selectInput.insertAdjacentHTML(
      "beforeend",
      `<option value="${index}">${code} - ${name}</option>`,
    );
    $selectInput2.insertAdjacentHTML(
      "beforeend",
      `<option value="${index}">${code} - ${name}</option>`,
    );
  });
};

const getConvert = async () => {
  const currency1 = currencyList[$selectInput.value][0];
  const currency2 = currencyList[$selectInput2.value][0];
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
  console.log(itemsText);
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

const start = () => {
  getAllCurrency();
  loadHistoryList();
  createHistoryItemFromStorage();
};

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  getConvert();
});

document.addEventListener("DOMContentLoaded", start);
$historyButton.addEventListener("click", toggleHistory);
$historyClearButton.addEventListener("click", clearHistory);
