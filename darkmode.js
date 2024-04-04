document.addEventListener("DOMContentLoaded", () => {
    let but = document.getElementById("dark")
    but.addEventListener("click", () => {
        console.log("changing theme")
        if (but.innerText == "dark mode"){
            but.innerText = "light mode"
            document.body.id = "dark"
        }
        else{
            but.innerText = "dark mode"
            document.body.id = ""
        }
    })
    but.addEventListener('keydown', function(event) {
        if (event.key == "Enter"){
            event.preventDefault() //anti-epilepsy thing
        }
    });
})