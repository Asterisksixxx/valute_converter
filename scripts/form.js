import { getAllCurrency } from "./converter.js";
import { $form, $selectFrom, $selectTo } from "./selectors.js";

const appendSelectListOption = (option) => {
  const [code, name] = option;

  $selectFrom.insertAdjacentHTML(
    "beforeend",
    `<option>${code} - ${name}</option>`,
  );
  $selectTo.insertAdjacentHTML(
    "beforeend",
    `<option>${code} - ${name}</option>`,
  );
};
const initForm = async () => {
  const currencyList = await getAllCurrency();
  currencyList.forEach(appendSelectListOption);
};
const formData = new FormData($form);

export { initForm, formData };
