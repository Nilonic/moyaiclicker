// VersionLabelUpdater.module.js
// Part of Moyai Clicker V2 Source Code
// Under the MIT License

import { DEBUG_DB_STATUS } from "./Storage.module.js";

function checkIp(ip) {
  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4.test(ip) || ipv6.test(ip);
}

addEventListener("DOMContentLoaded", () => {
  // Function to fetch the first line of a file
  function getFirstLineOfLocalFile(filename, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filename, true);
    rawFile.onreadystatechange = function () {
      if (
        rawFile.readyState === 4 &&
        (rawFile.status === 200 || rawFile.status == 0)
      ) {
        var allText = rawFile.responseText;
        var lines = allText.split("\n");
        var firstLine = lines[0].trim();
        callback(firstLine);
      }
    };
    rawFile.send(null);
  }
  const verString = document.getElementById("verString");

  //initial scan. we don't have to get remote content as, well, the current content should be up-to-date
  const verStr = document.createElement("div");
  var gitVer;
  let intervalId;
  getFirstLineOfLocalFile("curver.txt", (firstLine) => {
    if (firstLine == "") {
      setTimeout(() => {
        clearInterval(intervalId);
        verStr.innerText = "Couldn't get version";
        verString.style.color = "rgb(255, 127, 127)";
        verString.style.visibility = "visible";
      }, 500);
    } else {
      gitVer = firstLine;
      verStr.innerText = `Moyai Clicker V${gitVer}`;
      verString.style.visibility = "visible";
    }
    if (location.origin.includes("localhost")) {
      verStr.innerText += " (DEV BUILD)";
      // debug stuff
      let stats = DEBUG_DB_STATUS();
      const isDBReady = document.createElement("div");
      const isDBDirty = document.createElement("div");
      const dbSize = document.createElement("div");
      const flushMemToDB = document.createElement("button");
      const addClicks = document.createElement("button");
      verString.appendChild(isDBReady);
      verString.appendChild(isDBDirty);
      verString.appendChild(dbSize);
      verString.appendChild(flushMemToDB);
      verString.appendChild(addClicks);
      flushMemToDB.innerText = "Flush in-memory DB to Indexed DB"
      addClicks.innerText = "add 10 clicks";
      addClicks.addEventListener("click", () => {
        const keyupEvent = new KeyboardEvent("keyup", {
          key: "a",
          code: "KeyA",
          keyCode: 65,
          bubbles: true,
        });
        for (let index = 0; index < 10; index++) {
          document.dispatchEvent(keyupEvent);
        }
      });
      flushMemToDB.addEventListener("click", async () => {
        await stats[3]();
      });
      isDBReady.innerText = `IsReady: ${stats[0]}`;
      isDBDirty.innerText = `IsDirty: ${stats[1]}`;
      dbSize.innerText = `Size: ${stats[2].size}`;
      setInterval(() => {
        isDBReady.innerText = `IsReady: ${stats[0]}`;
        isDBDirty.innerText = `IsDirty: ${stats[1]}`;
        dbSize.innerText = `Size: ${stats[2].size}`;
      }, 1000);
    }
  });
  verString.appendChild(verStr);
});
