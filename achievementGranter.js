function grantAchievement(ach_name = "oops!") {
    let x = (achievement_name) => {
        // Create a new div element
        var popup = document.createElement('div');

        // Style the popup
        popup.style.position = 'fixed';
        popup.style.bottom = '20px';
        popup.style.right = '20px';
        popup.style.backgroundColor = '#333';
        popup.style.color = '#fff';
        popup.style.padding = '10px';
        popup.style.borderRadius = '5px';
        popup.style.zIndex = '9999';
        popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
        popup.style.opacity = '0';
        popup.style.transition = 'opacity 0.5s ease';

        // Set the text content of the popup
        popup.textContent = 'You got the achievement ' + achievement_name;

        // Append the popup to the body
        document.body.appendChild(popup);

        // Trigger reflow to apply styles before animating
        popup.getBoundingClientRect();

        // Fade in the popup
        popup.style.opacity = '1';

        // Automatically hide the popup after a delay
        setTimeout(function() {
            popup.style.opacity = '0';
            setTimeout(function() {
                // Remove the popup from the DOM after fading out
                popup.parentNode.removeChild(popup);
            }, 500); // Fading out duration
        }, 3000); // Display duration
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
            x("Enable Dark mode")
            localStorageAPI.write("ACH_DARK", 1);
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