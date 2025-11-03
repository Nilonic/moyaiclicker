// DarkMode.module.js
// Part of Moyai Clicker V2 Source Code
// Under the MIT License

import { GrantAchievement } from "./Achievements.module.js";
import { Read, Write } from "./Storage.module.js";

document.addEventListener("DOMContentLoaded", async () => {
  const but = document.getElementById("dark");
  const dm = await Read("OPT_DM");

  if (dm === 1) {
    but.innerText = "light mode";
    document.body.id = "dark";
  } else if (dm == null && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    but.innerText = "light mode";
    document.body.id = "dark";
    await Write("OPT_DM", 1);
  }

  but.addEventListener("click", async () => {
    if (but.innerText === "dark mode") {
      but.innerText = "light mode";
      document.body.id = "dark";
      await Write("OPT_DM", 1);
    } else {
      but.innerText = "dark mode";
      document.body.id = "";
      await Write("OPT_DM", 0);
    }
  });

  but.addEventListener("keydown", (event) => {
    if (event.key === "Enter") event.preventDefault();
  });
});
