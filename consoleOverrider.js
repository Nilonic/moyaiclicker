/**
 * goofy-aah IIFE
 */
let x = () => {
    const copyOfError = console.error;
    const copyOfLog = console.log;
    const copyOfWarn = console.warn;
    const copyOfTrace = console.trace;
    const copyOfEval = eval;

    const doConsoleLogging = false;
    const allowUnsafe = false;

    console.error = function(...data) {
        if (localStorageAPI.read("ACH_EAE") == null) {
            grantAchievement(); // Grants the achievement
        }
        if (doConsoleLogging) {
            copyOfError.apply(console, data);
        } else {
            return ("Sorry, logging is disabled.");
        }
    };

    console.warn = function(...data) {
        if (doConsoleLogging) {
            copyOfWarn.apply(console, data);
        } else {
            return ("Sorry, logging is disabled.");
        }
    };

    console.log = function(...data) {
        if (doConsoleLogging) {
            copyOfLog.apply(console, data);
        } else {
            return ("Sorry, logging is disabled.");
        }
    };

    console.info = console.log

    console.trace = function(...data) {
        if (doConsoleLogging) {
            copyOfTrace.apply(console, data);
        } else {
            return ("Sorry, logging is disabled.");
        }
    };

    eval = function (x){
        if (allowUnsafe) {
            copyOfEval(x)
        }
        else{
            return ("Sorry, eval is disabled (allowUnsafe = false)");
        }
    }

}
x();
x = () => {
    //nah. you're gonna need to read the source code to find out what this does
    return ("nah. you're gonna need to read the source code to find out what this does");
}