const PythonShell = require('python-shell');

function executeScript(arguments) {
    
    let options = {
        args: arguments
    }

    const pyShell = new PythonShell('./hello.py', options)

    pyShell.on('message', function (message) {
        comments = JSON.parse(message)
        return comments;
    });

    pyShell.on('error', function (err) {
        console.error(err);
    });

}

module.exports = executeScript;