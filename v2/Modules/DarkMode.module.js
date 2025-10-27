import { GrantAchievement } from "./Achievements.module.js"
import { Read, Write } from "./LocalStorage.module.js"

document.addEventListener("DOMContentLoaded", () => {
    let but = document.getElementById("dark")
    if (Read("OPT_DM") == 1) {
        but.innerText = "light mode"
        document.body.id = "dark"
    }
    but.addEventListener("click", () => {
        //console.log("changing theme")
        if (but.innerText == "dark mode") {
            but.innerText = "light mode"
            document.body.id = "dark"
            Write("OPT_DM", 1)
            if (Read("ACH_DARK") == null) {
                GrantAchievement("darkmodefirst")
            }
        } else {
            but.innerText = "dark mode"
            document.body.id = ""
            Write("OPT_DM", 0)
            if (Read("ACH_LIGHT") == null) {
                GrantAchievement("lightmodereturn")
            }
        }
    })
    but.addEventListener('keydown', function(event) {
        if (event.key == "Enter") {
            event.preventDefault() //anti-epilepsy thing
        }
    });
})