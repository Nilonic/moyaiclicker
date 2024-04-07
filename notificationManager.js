function createNotification (message, fadeout=500, display=3000, zLayer="50") {
    // Create a new div element
    var popup = document.createElement('div')
    // Style the popup
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.right = '20px';
    popup.style.backgroundColor = '#333';
    popup.style.color = '#fff';
    popup.style.padding = '10px';
    popup.style.borderRadius = '5px';
    popup.style.zIndex = zLayer;
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.5s ease'
    // Set the text content of the popup
    popup.textContent = message
    // Append the popup to the body
    document.body.appendChild(popup)
    // Trigger reflow to apply styles before animating
    popup.getBoundingClientRect()
    // Fade in the popup
    popup.style.opacity = '1'
    // Automatically hide the popup after a delay
    setTimeout(function() {
        popup.style.opacity = '0';
        setTimeout(function() {
            // Remove the popup from the DOM after fading out
            popup.parentNode.removeChild(popup);
        }, fadeout); // Fading out duration
    }, display); // Display duration
}