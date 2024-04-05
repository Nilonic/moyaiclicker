document.addEventListener("DOMContentLoaded", () => {
    let but = document.getElementById("dark")
    if (localStorageAPI.read("OPT_DM") == 1) {
        but.innerText = "light mode"
        document.body.id = "dark"
    }
    but.addEventListener("click", () => {
        //console.log("changing theme")
        if (but.innerText == "dark mode") {
            but.innerText = "light mode"
            document.body.id = "dark"
            localStorageAPI.write("OPT_DM", 1)
            if (localStorageAPI.read("ACH_DARK") == null) {
                grantAchievement("darkmodefirst")
            }
        } else {
            but.innerText = "dark mode"
            document.body.id = ""
            localStorageAPI.write("OPT_DM", 0)
            if (localStorageAPI.read("ACH_LIGHT") == null) {
                grantAchievement("lightmodereturn")
            }
        }
    })
    but.addEventListener('keydown', function(event) {
        if (event.key == "Enter") {
            event.preventDefault() //anti-epilepsy thing
        }
    });
})