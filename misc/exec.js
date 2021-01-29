const childProcess = require("child_process")

// Thanks to @Zytekaron for the code
function exec(commands) {
    return new Promise(resolve => {
        let buf = [], killed = false 
        const child = childProcess.spawn(commands.join(' && '), {
            shell: true
        });
        const timeout = setTimeout(() => { child.kill("SIGTERM"); killed = true }, 30000)

        child.stdout.on('data', data => {
            buf.push(data.toString());
        });

        child.stderr.on('data', data => {
            buf.push(data.toString());
        });

        child.on('exit', exitCode => {
            if (killed) return;
            buf.push('Exited with code: ');
            buf.push(exitCode);
            clearTimeout(timeout)
            resolve(buf.join(''));
        });
        child.on('close', signal => {
            buf.push('\nExited with signal: ');
            buf.push(signal);
            resolved = true;
            resolve(buf.join(''));
        });
       
    });
}

module.exports = exec
