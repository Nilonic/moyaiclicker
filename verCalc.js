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
    
        // Usage example
    const verString = document.getElementById("verString");

    //create da element
    const verStr = document.createElement("div");
    getFirstLineOfFile("curver.txt", (firstLine) => {
        var gitVer = firstLine;
        verStr.innerText = gitVer;
    });
    verString.appendChild(verStr);
})


