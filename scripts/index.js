import {
  $selectInput,
  $selectInput2,
  $form,
  $document,
  $themeButton,
} from "./selectors.js";

import { getAllCurrency, getConvert } from "./converter.js";

import { createHistoryItem } from "./history.js";

const appendSelectListOption = (option) => {
  const [code, name] = option;

  $selectInput.insertAdjacentHTML(
    "beforeend",
    `<option>${code} - ${name}</option>`,
  );
  $selectInput2.insertAdjacentHTML(
    "beforeend",
    `<option>${code} - ${name}</option>`,
  );
};
const initSelectList = async () => {
  const currencyList = await getAllCurrency();
  currencyList.forEach(appendSelectListOption);
};

const handleThemeButton = () => {
  const currentThema = $document.dataset.theme;
  $document.setAttribute(
    "data-theme",
    currentThema === "light" ? "dark" : "light",
  );
  localStorage.setItem("Thema", $document.dataset.theme);
};

const initColorTheme = () => {
  const savedTheme = localStorage.getItem("Thema");
  $document.setAttribute("data-theme", savedTheme);
};

const start = () => {
  initSelectList();
  createHistoryItem();
  initColorTheme();
};
$themeButton.addEventListener("click", handleThemeButton);
$form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(
    event,
    event.srcElement[0].value,
    event.srcElement[1].value,
    event.srcElement[2].value,
  );

  getConvert(
    event.srcElement[0].value,
    event.srcElement[1].value,
    event.srcElement[2].value,
  );
});

document.addEventListener("DOMContentLoaded", start);
