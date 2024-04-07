function grantAchievement(ach_name = "oops!") {
    let x = (achievement_name) => {
        createNotification(`You got the Achievement "${achievement_name}"`)
    }
    switch (ach_name.toLowerCase()) {
        //misc
        case "acceptcookies":
            console.log("granting achievement 'acceptcookies'")
            x("Accepted the cookies")
            localStorageAPI.write("ACH_COOK_ACC", 1);
            break
        case "darkmodefirst":
            console.log("granting achievement 'darkmodefirst'")
            x("Embrace the Dark Side")
            localStorageAPI.write("ACH_DARK", 1);
            break
        case "lightmodereturn":
            console.log("granting achievement 'lightmodereturn'")
            x("Return to the light")
            localStorageAPI.write("ACH_LIGHT", 1);
            break
        case "open devtools":
            console.log("granting achievement 'open devtools'")
            x("Open devtools")
            localStorageAPI.write("ACH_DT", 1);
            break
            //milestones
        case "milestone 1":
            console.log("granting achievement 'milestone 1'")
            x("Baby Steps")
            localStorageAPI.write("ACH_MS1", 1);
            break
        case "milestone 2":
            console.log("granting achievement 'milestone 2'")
            x("Stone Sculptor")
            localStorageAPI.write("ACH_MS2", 1);
            break
        case "milestone 3":
            console.log("granting achievement 'milestone 3'")
            x("Monument Builder")
            localStorageAPI.write("ACH_MS3", 1);
            break
        case "milestone 4":
            console.log("granting achievement 'milestone 4'")
            x("Ancient Artisan")
            localStorageAPI.write("ACH_MS4", 1);
            break
        case "milestone 5":
            console.log("granting achievement 'milestone 5'")
            x("Rock Enthusiast")
            localStorageAPI.write("ACH_MS5", 1);
            break


            //super secret Achievements
        default:
            //alert("oops!")
            x("Encounter an error")
            localStorageAPI.write("ACH_EAE", 1);
            break
    }
}