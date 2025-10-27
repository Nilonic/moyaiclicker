import { CreateNotification } from "./Notifications.module.js";
import { Write } from "./LocalStorage.module.js";

export function GrantAchievement(ach_name = "oops!") {
  let x = (achievement_name) => {
    CreateNotification(`You got the Achievement "${achievement_name}"`);
  };
  switch (ach_name.toLowerCase()) {
    case "acceptcookies":
      x("Bake sale? Count me in!");
      Write("ACH_COOK_ACC", 1);
      break;
    case "darkmodefirst":
      // logic here
      x("Embrace the void");
      Write("ACH_DARK", 1);
      break;
    case "lightmodereturn":
      // logic here
      x("Return to the light");
      Write("ACH_LIGHT", 1);
      break;
    case "open devtools":
      // logic here
      x("Master Hacker");
      Write("ACH_DT", 1);
      break;
    case "milestone 1":
      x("Pebble Painter");
      Write("ACH_MS1", 1);
      // logic here
      break;
    case "milestone 2":
      x("Stone Sculptor");
      Write("ACH_MS2", 1);
      // logic here
      break;
    case "milestone 3":
      x("Monument Maker");
      Write("ACH_MS3", 1);
      // logic here
      break;
    case "milestone 4":
      x("Ancient Artisan");
      Write("ACH_MS4", 1);
      // logic here
      break;
    case "milestone 5":
      x("TODO: add new Milestones");
      Write("ACH_MS5", 1);
      // logic here
      break;
    default:
      x("Encounter an error");
      Write("ACH_EAE", 1);
      break;
  }
}
