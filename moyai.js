let timesMoyaid = 0;
let resetting = false;
let volume = 1;
let audio; // Define audio in the outer scope

function playSoundEffect() {
    if (!resetting) {
        console.log("playing sfx");
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

    document.addEventListener('keypress', playSoundEffect);
    document.addEventListener("click", playSoundEffect);

    resetButton.addEventListener("click", () => {
        resetting = true;
        setTimeout(() => {
            //timesMoyaid = -1;
            timesMoyaid = 0; //stupid fuckin legacy code
            counterElement.innerText = timesMoyaid;
            resetting = false;
        }, 25);
    });

    volumeSlider.addEventListener("change", () => {
        volume = volumeSlider.value / 100;
        console.log(volume);
    });
});
