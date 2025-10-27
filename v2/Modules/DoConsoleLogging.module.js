import { GrantAchievement } from "./Achievements.module.js";
import { Read } from "./LocalStorage.module.js";

let DoConsoleLogging = () => {
  const copyOfError = console.error;
  const copyOfLog = console.log;
  const copyOfWarn = console.warn;
  const copyOfTrace = console.trace;

  const doConsoleLogging = true;

  console.error = function (...data) {
    if (Read("ACH_EAE") == null) {
      GrantAchievement(); // Grants the achievement
    }
    if (doConsoleLogging) {
      copyOfError.apply(console, data);
    } else {
      return "Sorry, logging is disabled.";
    }
  };

  console.warn = function (...data) {
    if (doConsoleLogging) {
      copyOfWarn.apply(console, data);
    } else {
      return "Sorry, logging is disabled.";
    }
  };

  console.log = function (...data) {
    if (doConsoleLogging) {
      copyOfLog.apply(console, data);
    } else {
      return "Sorry, logging is disabled.";
    }
  };

  console.info = console.log;

  console.trace = function (...data) {
    if (doConsoleLogging) {
      copyOfTrace.apply(console, data);
    } else {
      return "Sorry, logging is disabled.";
    }
  };
};
DoConsoleLogging();