// globals.js
export let savedUsername = "";
export let savedPassword = "";

export function setSavedUsername(username) {
  savedUsername = username;
}

export function setSavedPassword(password) {
  savedPassword = password;
}

export function getSavedUsername() {
  return savedUsername;
}

export function getSavedPassword() {
  return savedPassword;
}