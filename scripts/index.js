import {
  $form,
  $themeButton,
  $historyButton,
  $historyClearButton,
} from "./selectors.js";

import { initHistory, toggleHistory, clearHistory } from "./history.js";
import { initTheme, toggleTheme } from "./theme.js";
import { initForm, submitForm } from "./form.js";

const start = () => {
  initForm();
  initHistory();
  initTheme();
};

$themeButton.addEventListener("click", toggleTheme);

$form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = document.forms[0];

  submitForm(
    form.elements["from-currency"].value,
    form.elements["to-currency"].value,
    form.elements["amount-input"].value,
  );
});

document.addEventListener("DOMContentLoaded", start);
$historyButton.addEventListener("click", toggleHistory);
$historyClearButton.addEventListener("click", clearHistory);
