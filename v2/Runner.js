// Basically a glorified "init everything that needs to be initiaized" script
import { CreateCookie } from "./Modules/Cookies.module.js";
import {} from "./Modules/UpdateChecker.module.js"
import {} from "./Modules/DoConsoleLogging.module.js"
import {} from "./Modules/DarkMode.module.js"
import { Read, Write, Delete } from "./Modules/LocalStorage.module.js";
import { GrantAchievement } from "./Modules/Achievements.module.js";
import { CreateNotification } from "./Modules/Notifications.module.js";

// Game Logic here. Game Logic was fine, this is just a copy+paste really
let disabled = false;
let volume = 1;
let audio; // Define audio in the outer scope

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === "I") {
        if (Read("ACH_DT") == null) {
            GrantAchievement("open devtools")
        }
        // Ctrl+Shift+I pressed
        //alert("Ctrl+Shift+I pressed");
    } else if (event.key === "F12") {
        if (Read("ACH_DT") == null) {
            GrantAchievement("open devtools")
        }
        // F12 pressed
        //alert("F12 pressed");
    } else if (event.ctrlKey && event.shiftKey && event.key === "J") {
        if (Read("ACH_DT") == null) {
            GrantAchievement("open devtools")
        }
        // Ctrl+Shift+J pressed
        //alert("Ctrl+Shift+J pressed");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    let timesMoyaid = 0;
    if (Read("SAV_MOYAI") != null){
        timesMoyaid = Read("SAV_MOYAI");
        document.getElementById("🗿🗿🗿").innerText = timesMoyaid; //update the thing
    }
    else{
        timesMoyaid = 0;
    }
    
    const volumeSlider = document.getElementById("volume-slider");
    const resetButton = document.getElementById("reset");
    const srcButton = document.getElementById("src");
    const counterElement = document.getElementById("🗿🗿🗿");

    if (Read("OPT_VOL") != null){
        volume = Read("OPT_VOL") / 100;
        volumeSlider.value = Read("OPT_VOL");
    }
    else{
        volumeSlider.value = 50
        Write("OPT_VOL", 50)
        volume = Read("OPT_VOL") / 100;
    }

    audio = new Audio('vine-boom.mp3'); // Assign audio in the outer scope
    audio.preload = "auto";
    audio.onerror = function(event) {
        alert("Error when loading audio: " + event.target.error.message);
        console.error("Error when loading audio: " + event.target.error.message);
    };

    function clickDaMoyai() {
        if (!disabled) {
            //console.log("playing sfx");
            let x = audio.cloneNode();
            try {
                x.volume = volume;
            } catch (error) {
                console.error(`failed to set volume to value ${volume}. setting to 1`)
                volume = 1;
                x.volume = 1;
            }
            try{
            x.play();
            }
            catch{
                CreateNotification("Interact with the page first (AKA click)")
            }
            timesMoyaid += 1;
            Write("SAV_MOYAI", timesMoyaid);
            document.getElementById("🗿🗿🗿").innerText = timesMoyaid;
            if (timesMoyaid >= 10 && Read("ACH_MS1") == null) {
                GrantAchievement("Milestone 1")
            }
            if (timesMoyaid >= 50 && Read("ACH_MS2") == null) {
                GrantAchievement("Milestone 2")
            }
            if (timesMoyaid >= 100 && Read("ACH_MS3") == null) {
                GrantAchievement("Milestone 3")
            }
            if (timesMoyaid >= 250 && Read("ACH_MS4") == null) {
                GrantAchievement("Milestone 4")
            }
            if (timesMoyaid >= 500 && Read("ACH_MS5") == null) {
                GrantAchievement("Milestone 5")
            }
        } else {
            console.log("v");
        }
    }

    document.addEventListener('keyup', clickDaMoyai); // fix for holding down a key
    document.addEventListener("click", clickDaMoyai);
    srcButton.addEventListener("click", () => {
        location.href = "https://github.com/Nilonic/moyaiclicker/"
    })
    resetButton.addEventListener("click", () => {
        disabled = true;
        setTimeout(() => {
            //timesMoyaid = -1;
            timesMoyaid = 0; //stupid fuckin legacy code
            counterElement.innerText = timesMoyaid;
            // wipe all achievements
            Delete("ACH_COOK_ACC"); 
            Delete("ACH_DT");
            Delete("ACH_MS1");
            Delete("ACH_MS2");
            Delete("ACH_MS3");
            Delete("ACH_MS4");
            Delete("ACH_MS5");
            Delete("ACH_EAE");
            // delete the save
            Delete("SAV_MOYAI");
            // remove cookies
            CreateCookie("cookiesClickOK", "12321321312313213213");
            // reload the page
            location.reload();
            // as i didn't explain this. in case where location.reload doesn't work, just un-disable the shit
            disabled = false;
        }, 25);
    });

    volumeSlider.addEventListener("change", () => {
        Write("OPT_VOL", volumeSlider.value);
        volume = Read("OPT_VOL") / 100;
        console.log(volume);
    });
});