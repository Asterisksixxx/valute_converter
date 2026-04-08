const STORAGE_KEYS = {
  ACTIVE_THEME: "ACTIVE_THEME",
  HISTORY: "HISTORY",
};

const getStorageValue = (key, defaultValue = []) => {
  return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue));
};

const setStorageValue = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const deleteStorageValue = (key) => {
  localStorage.removeItem(key);
};

export { STORAGE_KEYS, getStorageValue, setStorageValue, deleteStorageValue };
