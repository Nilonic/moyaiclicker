// Notifications.module.js
// Part of Moyai Clicker V2 Source Code
// Under the MIT License

export function CreateNotification(message, fadeout = 500, display = 3000) {
  var popup = document.createElement("div");
  popup.setAttribute("id", "popup");
  popup.textContent = message;
  document.body.appendChild(popup);
  popup.getBoundingClientRect();
  popup.style.opacity = "1";
  setTimeout(function () {
    popup.style.opacity = "0";
    setTimeout(function () {
      popup.parentNode.removeChild(popup);
    }, fadeout);
  }, display);
}
