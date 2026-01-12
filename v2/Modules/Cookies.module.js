// Cookies.module.js
// Part of Moyai Clicker V2 Source Code
// Under the MIT License

import { GrantAchievement } from "./Achievements.module.js";
import { Read, Write, isLoaded } from "./Storage.module.js";

const COOKIE_ACH_KEY = "ACH_COOK_ACC";

document.addEventListener("DOMContentLoaded", async function cookieCheck() {
    while (!(await isLoaded())) {
    await new Promise(r => setTimeout(r, 50));
  }
  const accepted = await Read(COOKIE_ACH_KEY);

  // If achievement is NOT set to 1, show popup
  if (accepted != 1) {
    const cookieBox = document.getElementById("cookiez");
    const cookieBtn = document.getElementById("cookiez_button");

    cookieBox.style.visibility = "visible";

    cookieBtn.addEventListener("click", async () => {
      GrantAchievement("acceptcookies");
      cookieBox.style.visibility = "hidden";
    });
  }
});
