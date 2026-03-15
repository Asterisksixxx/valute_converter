//Продумать создание history item через localStorage и через форму, хочу 1 функцию на создание .DONE
//Переключение тем
//TODO разделить зависимости js файлов .DONE(Спросить у Кирилла, выглядит как дрочня)
//Пересмотреть все названия функций
//Исправить шрифты, добавить анимации
export const currencyState = {
  list: null,
};

import {
  $selectInput,
  $selectInput2,
  $form,
  $amount,
  $resultAmount,
  $resultRate,
} from "./selectors.js";

import {
  loadHistoryList,
  createHistoryItem,
  createHistoryItemFromStorage,
} from "./history.js";

import { getAllCurrency, getConvert } from "./converter.js";

const appendSelectList = () => {
  currencyState.list.forEach(([code, name], index) => {
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

export { appendSelectList };
