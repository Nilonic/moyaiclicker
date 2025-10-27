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
  });
  verString.appendChild(verStr);
});