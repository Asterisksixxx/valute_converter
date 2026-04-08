import { $document } from "./selectors.js";
import { getStorageValue, setStorageValue, STORAGE_KEYS } from "./storage.js";

const toggleTheme = () => {
  const currentTheme = $document.dataset.theme;

  $document.setAttribute(
    "data-theme",
    currentTheme === "light" ? "dark" : "light",
  );

  setStorageValue(STORAGE_KEYS.ACTIVE_THEME, $document.dataset.theme);
};

const initTheme = () => {
  $document.setAttribute(
    "data-theme",
    getStorageValue(STORAGE_KEYS.ACTIVE_THEME, "system"),
  );
};
export { toggleTheme, initTheme };
