addEventListener("DOMContentLoaded", () => {
        // Function to fetch the first line of a file
        function getFirstLineOfFile(filename, callback) {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", filename, true);
            rawFile.onreadystatechange = function () {
                if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status == 0)) {
                    var allText = rawFile.responseText;
                    var lines = allText.split('\n');
                    var firstLine = lines[0].trim();
                    callback(firstLine);
                }
            }
            rawFile.send(null);
        }
    const verString = document.getElementById("verString");

    //initial scan
    const verStr = document.createElement("div");
    var gitVer
    getFirstLineOfFile("curver.txt", (firstLine) => {
        gitVer = firstLine;
        verStr.innerText = `Moyai Clicker V${gitVer}`;
    });
    verString.appendChild(verStr);

    setInterval(() => {
        getFirstLineOfFile("curver.txt", (firstLine) => {
            var gitVer2 = firstLine;
            if (gitVer2 != gitVer){
                verStr.innerText = `Moyai Clicker V${gitVer} (UPDATE. new ver: ${gitVer2})`
            }
        });
    }, 2500);
})


