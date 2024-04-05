const copyOfError = console.error;

console.error = function(...data) {
    if (localStorageAPI.read("ACH_EAE") == null) {
        grantAchievement(); //<-- grants the achievement
    }
    copyOfError.apply(console, data);
};