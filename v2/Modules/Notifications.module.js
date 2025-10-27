// logically the same, now just a module
export function CreateNotification(
  message,
  fadeout = 500,
  display = 3000,
  zLayer = "50"
) {
  var popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.backgroundColor = "#333";
  popup.style.color = "#fff";
  popup.style.padding = "10px";
  popup.style.borderRadius = "5px";
  popup.style.zIndex = zLayer;
  popup.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
  popup.style.opacity = "0";
  popup.style.transition = "opacity 0.5s ease";
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
