const childProcess = require("child_process")

// Thanks to @Zytekaron for the code
function exec(commands, ctx) {
    return new Promise(resolve => {
        ctx?.message?.channel?.startTyping?.()
        let buf = [], killed = false 
        const child = childProcess.spawn(commands.join(' && '), {
            shell: true
        });
        const timeout = setTimeout(() => { child.kill("SIGINT"); killed = true }, 60000)

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
            ctx?.channel?.stopTyping(true)
            resolve(buf.join(''));
        });
        child.on('close', signal => {
            buf.push('\nExited due to inactivity.');
            resolved = true;
            ctx?.channel?.stopTyping(true)
            resolve(buf.join(''));
        });
       
    });
}

module.exports = exec
