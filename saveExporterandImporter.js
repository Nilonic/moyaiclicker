function exportSave(filename) {
    // Retrieve all items from Local Storage
    const localStorageItems = { ...localStorage };

    // Convert to JSON string
    const jsonString = JSON.stringify(localStorageItems, null, 2);

    // Create a Blob containing the JSON data
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Cleanup
    document.body.removeChild(link);
}

function importSave(jsonFile) {
    // Create a new FileReader object
    const reader = new FileReader();

    // Define the onload event handler
    reader.onload = function(event) {
        // Parse the JSON data
        const jsonData = JSON.parse(event.target.result);

        // Iterate over the data and set into Local Storage
        Object.keys(jsonData).forEach(key => {
            localStorage.setItem(key, jsonData[key]);
        });

        // Optionally, you can trigger a callback or perform other actions here
    };

    // Read the JSON file as text
    reader.readAsText(jsonFile);
}
function getCurrentDateForFile() {
    const currentDate = new Date();
    
    // Format the date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // Combine the formatted components into a file-friendly string
    const fileFriendlyDate = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

    return fileFriendlyDate;
}


addEventListener("DOMContentLoaded", () => {
    document.getElementById("ex_sv").addEventListener("click", () => {
        exportSave(`save ${getCurrentDateForFile()}.json`)
    })
})