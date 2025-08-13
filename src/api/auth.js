import apiUrl from "../apiConfig";
import axios from "axios";

export const signUp = (credentials) => {
  return axios({
    method: "POST",
    url: apiUrl + "/sign-up",
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation,
      },
    },
  });
};

export const signIn = (credentials) => {
  return axios({
    url: apiUrl + "/sign-in",
    method: "POST",
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
      },
    },
  });
};

export const signOut = (user) => {
  return axios({
    url: apiUrl + "/sign-out",
    method: "DELETE",
    headers: {
      Authorization: `Token token=${user.token}`,
    },
  });
};

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + "/change-password",
    method: "PATCH",
    headers: {
      Authorization: `Token token=${user.token}`,
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword,
      },
    },
  });
};

// Function runs any time user press the cancel subscription button
// Sends a object with only the isSubscribed attribute as a PATCH request to our data base
// At end runs getProfile to ensure that our profile in App.js is up to date
export function patchSubscription(user) {
  return fetch(`${apiUrl}/profiles/user/${user._id}`, {
    method: "PATCH",
    body: JSON.stringify({ isSubscribed: false }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(new Error(`Request failed with status ${res.status}`));
    }
    return;
  });
}

