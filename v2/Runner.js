// Runner.js
// Part of Moyai Clicker V2 Source Code
// Under the MIT License

import { CreateCookie } from "./Modules/Cookies.module.js";
import {} from "./Modules/UpdateChecker.module.js";
import {} from "./Modules/DoConsoleLogging.module.js";
import {} from "./Modules/DarkMode.module.js";
import { Read, Write, Delete } from "./Modules/Storage.module.js";
import { GrantAchievement } from "./Modules/Achievements.module.js";
import { CreateNotification } from "./Modules/Notifications.module.js";

// Game Logic here. Game Logic was fine, this is just a copy+paste really
let disabled = false;
let volume = 1;
let audio;

document.addEventListener("keydown", function (event) {
  if (
    (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) ||
    event.key === "F12"
  ) {
    Read("ACH_DT").then(val => {
      if (val == null) GrantAchievement("open devtools");
    });
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  let timesMoyaid = 0;
  const saved = await Read("SAV_MOYAI");
  if (saved != null) {
    timesMoyaid = saved;
    document.getElementById("🗿🗿🗿").innerText = timesMoyaid;
  }

  const volumeSlider = document.getElementById("volume-slider");
  const resetButton = document.getElementById("reset");
  const srcButton = document.getElementById("src");
  const counterElement = document.getElementById("🗿🗿🗿");

  const storedVol = await Read("OPT_VOL");
  if (storedVol != null) {
    volume = storedVol / 100;
    volumeSlider.value = storedVol;
  } else {
    volumeSlider.value = 50;
    await Write("OPT_VOL", 50);
    volume = 0.5;
  }

  audio = new Audio("vine-boom.mp3");
  audio.preload = "auto";

  async function clickDaMoyai() {
    if (disabled) return;

    const x = audio.cloneNode();
    try {
      x.volume = volume;
    } catch {
      x.volume = 1;
      volume = 1;
    }

    try {
      await x.play();
    } catch {
      CreateNotification("Interact with the page first (click once!)");
    }

    timesMoyaid++;
    await Write("SAV_MOYAI", timesMoyaid);
    counterElement.innerText = timesMoyaid;

    // Check achievements
    const milestones = [
      [10, "ACH_MS1", "Milestone 1"],
      [50, "ACH_MS2", "Milestone 2"],
      [100, "ACH_MS3", "Milestone 3"],
      [250, "ACH_MS4", "Milestone 4"],
      [500, "ACH_MS5", "Milestone 5"],
    ];
    for (const [threshold, key, name] of milestones) {
      if (timesMoyaid >= threshold && (await Read(key)) == null) {
        GrantAchievement(name);
      }
    }
  }

  document.addEventListener("keyup", clickDaMoyai);
  document.addEventListener("click", clickDaMoyai);
  srcButton.addEventListener("click", () => {
    location.href = "https://github.com/Nilonic/moyaiclicker/";
  });

  resetButton.addEventListener("click", async () => {
    disabled = true;
    setTimeout(async () => {
      timesMoyaid = 0;
      counterElement.innerText = timesMoyaid;

      // Wipe all achievements + save
      const keys = [
        "ACH_COOK_ACC", "ACH_DT", "ACH_MS1", "ACH_MS2",
        "ACH_MS3", "ACH_MS4", "ACH_MS5", "ACH_EAE",
        "SAV_MOYAI"
      ];
      for (const k of keys) await Delete(k);

      CreateCookie("cookiesClickOK", "12321321312313213213");
      location.reload();
      disabled = false;
    }, 25);
  });

  volumeSlider.addEventListener("change", async () => {
    await Write("OPT_VOL", volumeSlider.value);
    const newVol = await Read("OPT_VOL");
    volume = newVol / 100;
    console.log(volume);
  });
});