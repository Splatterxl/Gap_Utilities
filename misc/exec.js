const childProcess = require("child_process")

// Thanks to @Zytekaron for the code
function exec(commands) {
    return new Promise(resolve => {
        const buf = [], resolved = false
  
        const child = childProcess.spawn(commands.join(' && '), {
            shell: true
        });
        const timeout = setTimeout(() => { child.exit(300); }, 60000)

        child.stdout.on('data', data => {
            buf.push(data.toString());
        });

        child.stderr.on('data', data => {
            buf.push(data.toString());
        });

        child.on('exit', exitCode => {
            buf.push('Exited with code: ');
            buf.push(exitCode);
            resolved = true;
            timeout.clear()
            resolve(buf.join(''));
        });
       
    });
}

module.exports = exec
