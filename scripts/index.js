// api.js - все апи запросы (getCurrencies, getRate)
// theme.js - все по теме (initTheme, toggleTheme)
// form.js - все по форму (initForm, submitForm)

import {
  $form,
  $themeButton,
  $historyButton,
  $historyClearButton,
} from "./selectors.js";

import { getAllCurrency, getConvert } from "./converter.js";

import { initHistory, toggleHistory, clearHistory } from "./history.js";
import { initTheme, toggleTheme } from "./theme.js";
import { initForm, formData } from "./form.js";

const start = () => {
  initForm();
  initHistory();
  initTheme();
};

$themeButton.addEventListener("click", toggleTheme);

// const handleSubmitForm = (event) => {
// submitForm(param, param, param)
// };

// надо бы вынести formData куда-нибудь
$form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = document.forms[0];
  console.log(
    form.elements["from-currency"].value,
    form.elements["to-currency"].value,
    form.elements["amount-input"].value,
  );

  getConvert(
    form.elements["from-currency"].value,
    form.elements["to-currency"].value,
    form.elements["amount-input"].value,
  );
});

document.addEventListener("DOMContentLoaded", start);
$historyButton.addEventListener("click", toggleHistory);
$historyClearButton.addEventListener("click", clearHistory);
