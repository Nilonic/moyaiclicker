addEventListener("DOMContentLoaded", () => {
    // Function to fetch the first line of a file
    function getFirstLineOfLocalFile(filename, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", filename, true);
        rawFile.onreadystatechange = function() {
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

    //initial scan. we don't have to get remote content as, well, the current content should be up-to-date
    const verStr = document.createElement("div");
    var gitVer;
    let intervalId;
    getFirstLineOfLocalFile("curver.txt", (firstLine) => {
        if (firstLine == ""){
            setTimeout(() => {
                console.log(`stopping interval id=${intervalId}`);
                clearInterval(intervalId)
                verStr.innerText = "Couldn't get version"
                verString.style.color = "rgb(255, 127, 127)"
                
                verString.style.visibility = "visible";
            }, 500)
        }
        else{
        gitVer = firstLine;
        verStr.innerText = `Moyai Clicker V${gitVer}`;
        verString.style.visibility = "visible";
        }
    });
    verString.appendChild(verStr);

    intervalId = setInterval(() => {
        const url = 'https://raw.githubusercontent.com/Nilonic/moyaiclicker/main/curver.txt';
        const timestamp = new Date().getTime(); // Get current timestamp

        fetch(`${url}?t=${timestamp}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Parse data to get the first line
                const firstLine = data.split('\n')[0];
                //console.log(firstLine);
                const remVerSplit = firstLine.split(".");
                const loadedVerSplit = gitVer.split(".");
                const loadedVerLen = loadedVerSplit.length;
                //console.log(firstLine, remVerSplit, loadedVerSplit, loadedVerLen, remoteVerLen);
                if (loadedVerLen !== remVerSplit.length) {
                    createNotification("WARNING: version issues. Won't be checking anymore");
                    clearInterval(intervalId);
                }
                else{
                    console.log("ooh fuck yea");
                    for (let i = 0; i < loadedVerLen; i++) {
                        if (loadedVerSplit[i] < remVerSplit[i]) {
                            console.log("yes")
                            const ah = document.createElement("a");
                            ah.innerText = "Here";
                            ah.href = location.href;
                            verStr.innerText = `Moyai Clicker V${gitVer} (UPDATE AVAILABLE. Click `;
                            verStr.appendChild(ah);
                            verStr.innerHTML += " to reload)"; // Using innerHTML to append HTML tags
                            clearInterval(intervalId); //exit the interval
                            break; // Exit the loop after setting the innerText
                        }
                        else {
                            console.log(`no`, loadedVerSplit[i], remVerSplit[i], loadedVerSplit[i] < remVerSplit[i])
                        }
                    }
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, 24000);
})