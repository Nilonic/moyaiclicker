// Function to create a cookie
function createCookie(name, data, exp = Infinity) {
    let cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(data);
    
    // Check if expiration is set
    if (exp !== Infinity) {
        let expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (exp * 24 * 60 * 60 * 1000));
        cookieString += '; expires=' + expiryDate.toUTCString();
    }
    
    // Create the cookie
    document.cookie = cookieString;
    
    // Check if cookie was successfully created
    return readCookie(name) === data;
}

// Function to read a cookie
function readCookie(name) {
    let cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        
        // Check if this is the cookie we are looking for
        if (cookie.startsWith(encodeURIComponent(name) + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    
    // If cookie not found
    return null;
}

addEventListener("DOMContentLoaded", () => {
    if(readCookie("cookiesClickOK") != "true"){
        //alert(typeof(readCookie("cookiesClickOK")))
        document.getElementById("cookiez").style.visibility = "visible"
        document.getElementById("cookiez_button").addEventListener("click", () => {
            createCookie("cookiesClickOK", true);
            document.getElementById("cookiez").style.visibility = "hidden"
        })
    }
})