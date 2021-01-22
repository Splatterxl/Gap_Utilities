// Thanks to @Zytekaron for the code
function exec(commands) {
    return new Promise(resolve => {
        const buf = [];
        const child = childProcess.spawn(commands.join(' && '), {
            shell: true
        });

        child.stdout.on('data', data => {
            buf.push(data.toString());
        });

        child.stderr.on('data', data => {
            buf.push(data.toString());
        });

        child.on('exit', exitCode => {
            buf.push('Exited with code: ');
            buf.push(exitCode);
            resolve(buf.join(''));
        });
    });
}

module.exports = exec
