// DoConsoleLogging.module.js
// Part of Moyai Clicker V2 Source Code
// Under the MIT License

import { GrantAchievement } from "./Achievements.module.js";
import { Read } from "./Storage.module.js";

let DoConsoleLogging = () => {
  const copyOfError = console.error;
  const copyOfLog = console.log;
  const copyOfWarn = console.warn;
  const copyOfTrace = console.trace;
  const doConsoleLogging = true;

  console.error = function (...data) {
    Read("ACH_EAE").then(val => {
      if (val == null) GrantAchievement();
    });
    if (doConsoleLogging) copyOfError.apply(console, data);
  };

  console.warn = (...data) => doConsoleLogging ? copyOfWarn.apply(console, data) : "Logging disabled.";
  console.log  = (...data) => doConsoleLogging ? copyOfLog.apply(console, data)  : "Logging disabled.";
  console.info = (...data) => doConsoleLogging ? copyOfLog.apply(console, data) : "Logging disabled.";
  console.trace = (...data) => doConsoleLogging ? copyOfTrace.apply(console, data) : "Logging disabled.";
};

DoConsoleLogging();
