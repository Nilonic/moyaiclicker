var localStorageAPI = {
    // Method to write data to localStorage
    write: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    // Method to read data from localStorage
    read: function(key) {
        var value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        } else {
            return null;
        }
    },

    // Method to delete data from localStorage
    remove: function(key) {
        localStorage.removeItem(key);
    }
};
