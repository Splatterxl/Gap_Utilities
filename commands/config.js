module.exports = {
    name: 'config',
    description: "This command can be used to fuddle around with various settings.",
    execute(message){
        if (message.content.startsWith("o!config scan ")) {
            if (message.content == "o!config scan true") {
                config.scanEnabled = true;
                message.channel.send("Property \`scan\` successfully updated to \`true\`.")
                message.channel.send("All messages sent after this will be automatically scanned.")
                message.channel.send("This feature is purely comic relief although it will become quite annoying.")
            } else if (message.content = "o!config scan false") {
                config.scanEnabled = false;
                message.channel.send("Property \`scan\` successfully updated to \`false\`.")
            }
        }
    }
}