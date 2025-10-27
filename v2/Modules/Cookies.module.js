import { GrantAchievement } from "./Achievements.module.js";

export function CreateCookie(name, data, exp = Infinity) {
  let string = encodeURIComponent(name) + "=" + encodeURIComponent(data);
  if (exp !== Infinity) {
    let expiration = new Date();
    expiration.setTime(expiration.getDate() + exp * 24 * 60 * 60 * 1000);
    string += `; expires=${expiration.toUTCString()}`;
  }

  document.cookie = string;

  return ReadCookie(name) === string;
}

export function ReadCookie(name) {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(encodeURIComponent(name) + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

document.addEventListener("DOMContentLoaded", function cookieCheck() {
  if (ReadCookie("cookiesClickOK") != "true") {
    document.getElementById("cookiez").style.visibility = "visible";
    document.getElementById("cookiez_button").addEventListener("click", () => {
      CreateCookie("cookiesClickOK", true);
      GrantAchievement("acceptCookies");
      document.getElementById("cookiez").style.visibility = "hidden";
    });
  }
});
