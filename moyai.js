let timesMoyaid = 0;
let disabled = false;
let volume = 1;
let audio; // Define audio in the outer scope

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === "I") {
        if (localStorageAPI.read("ACH_DT") == null){
            grantAchievement("open devtools")
        }
        // Ctrl+Shift+I pressed
        //alert("Ctrl+Shift+I pressed");
    } else if (event.key === "F12") {
        if (localStorageAPI.read("ACH_DT") == null){
            grantAchievement("open devtools")
        }
        // F12 pressed
        //alert("F12 pressed");
    } else if (event.ctrlKey && event.shiftKey && event.key === "J") {
        if (localStorageAPI.read("ACH_DT") == null){
            grantAchievement("open devtools")
        }
        // Ctrl+Shift+J pressed
        //alert("Ctrl+Shift+J pressed");
    }
});

function clickDaMoyai() {
    if (!disabled) {
        //console.log("playing sfx");
        let x = audio.cloneNode();
        try {
            x.volume = volume;
        } catch (error) {
            volume = 1;
            x.volume = 1;
        }
        x.play();
        timesMoyaid += 1;
        document.getElementById("🗿🗿🗿").innerText = timesMoyaid;
        if (timesMoyaid == 10 && localStorageAPI.read("ACH_MS1") == null){
            grantAchievement("Milestone 1")
        }
        if (timesMoyaid == 50 && localStorageAPI.read("ACH_MS2") == null){
            grantAchievement("Milestone 2")
        }
        if (timesMoyaid == 100 && localStorageAPI.read("ACH_MS3") == null){
            grantAchievement("Milestone 3")
        }
        if (timesMoyaid == 250 && localStorageAPI.read("ACH_MS4") == null){
            grantAchievement("Milestone 4")
        }
        if (timesMoyaid == 500 && localStorageAPI.read("ACH_MS5") == null){
            grantAchievement("Milestone 5")
        }
    } else {
        console.log("v");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const volumeSlider = document.getElementById("volume-slider");
    const resetButton = document.getElementById("reset");
    const counterElement = document.getElementById("🗿🗿🗿");
    
    volumeSlider.value = 100;

    audio = new Audio('vine-boom.mp3'); // Assign audio in the outer scope
    audio.preload = "auto";
    audio.onerror = function (event) {
        alert("Error when loading audio: " + event.target.error.message);
        console.error("Error when loading audio: " + event.target.error.message);
    };

    document.addEventListener('keypress', clickDaMoyai);
    document.addEventListener("click", clickDaMoyai);

    resetButton.addEventListener("click", () => {
        //disabled = true;
        setTimeout(() => {
            //timesMoyaid = -1;
            timesMoyaid = 0; //stupid fuckin legacy code
            counterElement.innerText = timesMoyaid;
            //disabled = false;
        }, 25);
    });

    volumeSlider.addEventListener("change", () => {
        volume = volumeSlider.value / 100;
        console.log(volume);
    });
});

