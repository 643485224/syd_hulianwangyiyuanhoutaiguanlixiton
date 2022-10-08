export const getAdmin = ( locla, key ) => {
  return JSON.parse(locla.getItem(key))
};
export const getAdmin2 = ( locla, key ) => {
  return locla.getItem(key)
};
export const setAdmin = (local, key, value) => {
  local.removeItem(key);
  local.setItem(key, value)
};
export const removeAdmin = (local, key) => {
  local.removeItem(key);
};
export const getToken = () => {
  return localStorage.getItem('TOKEN');
};