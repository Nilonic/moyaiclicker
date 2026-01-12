// AchievementsPage.module.js
// Part of Moyai Clicker V2 Source Code
// Under the MIT License

import { ACHIEVEMENTS } from "./AchievementList.module.js";
import { Read, isLoaded } from "./Storage.module.js";

async function renderAchievements() {
  const topscroll = document.getElementById("ach_pg_topscroll");
  const desc = document.getElementById("ach_pg_desc");

  if (!topscroll || !desc) return;

  topscroll.innerHTML = "";
  desc.textContent = "Click an achievement to view details.";

  for (const ach of ACHIEVEMENTS) {
    const unlocked = (await Read(ach.key)) === 1;

    const achElem = document.createElement("div");
    achElem.textContent = ach.name;

    achElem.id = unlocked ? "ach_pg_ach" : "ach_pg_locked";
    achElem.classList.add("achievement-entry");

    achElem.addEventListener("click", () => {
      desc.textContent = unlocked ? ach.desc : ach.hint;
    });

    topscroll.appendChild(achElem);
  }
}

export async function update() {
  await renderAchievements();
}

document.addEventListener("DOMContentLoaded", async () => {
  while (!(await isLoaded())) {
    await new Promise((r) => setTimeout(r, 50));
  }
  renderAchievements();
});
