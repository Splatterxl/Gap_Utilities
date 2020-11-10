module.exports = {
    run: (bot, msg) =>
    {
        if (msg.content.toLowerCase().includes("china is bad")) msg.delete();
        msg.reply(`your message has been deleted because it may have contained misinformation.`);
    }
}