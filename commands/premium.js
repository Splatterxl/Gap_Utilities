module.exports.run = async (bot, msg, args, db, flags) =>
{
    if ((flags.getObj().solo.includes("c") || flags.getObj().solo.includes("check")) && (await db.ref(`premium/${msg.guild.id}`).get()).val())
        return msg.reply("It seems premium is enabled on your guild UwU!");
    else
        if (flags.getObj().solo.includes("c") || flags.getObj().solo.includes("check"))
            return msg.reply("Eureka! Premium is not enabled in your guild... big sad");
        else
            if (flags.getObj().options.redeem || flags.getObj().options.r) {
                const code = flags.getObj().options.r || flags.getObj().options.redeem
                if ((await db.ref(`prem_codes/${r}`).get()).val() && !(await db.ref(`premium/${msg.guild.id}`).get()).val())
                    db.ref(`premium/${msg.guild.id}`).set(true).then(() => msg.reply("Done, this server will now enjoy Premium forever!"));
                else
                    msg.reply("OwO whats this, an invalid code.");
            }
            else
                if (require('../whitelist').includes(msg.author.id) && flags.getObj().solo.includes('rm'))
                {
                    db.ref(`premium/${msg.guild.id}`).remove();
                } else
                    return msg.reply('Unknown usage, proper usage should include 1+ flag(s), `-r | --redeem` or `-c | --check`');
};

module.exports.help = {
        "name": ">premium",
        "id": "premium",
        "aliases": [
            "premium",
            "prem"
        ],
        "category": "bot",
        "desc": "Use various different Premium utilities.",
        "example": ">premium --check",
        "whitelisted": false
    }
