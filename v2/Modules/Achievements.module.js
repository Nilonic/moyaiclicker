// Achievements.module.js
// Part of Moyai Clicker V2 Source Code
// Under the MIT License

import { ACHIEVEMENTS } from "./AchievementList.module.js";
import { CreateNotification } from "./Notifications.module.js";
import { Write, Read } from "./Storage.module.js";
import { update } from "./AchievementsPage.module.js";

export async function GrantAchievement(id) {
  const ach = ACHIEVEMENTS.find((a) => a.id === id);
  if (!ach) return;
  console.log(ach);
  const already = await Read(ach.key);
  console.log(already);
  if (already === 1) return;

  await Write(ach.key, 1);

  if (ach.notify) {
    CreateNotification(`You got the Achievement "${ach.name}"`);
  }

  update();
}
