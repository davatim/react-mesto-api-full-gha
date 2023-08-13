// export const BASE_URL = 'https://api.davatim.nomoreparties.co';
const BASE_URL = "http://localhost:3000";
export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: password, email: email }),
  }).then(getResponseData);
}

export function login(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: password, email: email }),
  }).then(getResponseData);
}

export function loginWithToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      // "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(getResponseData);
}
export function logout() {
  return fetch(`${BASE_URL}/logout`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getResponseData);
}
function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}
