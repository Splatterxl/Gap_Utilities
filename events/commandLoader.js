const { readdirSync } = require('fs');
let ascii = require("ascii-table");

let table = new ascii().setHeading(`Command`, `Status`);

module.exports = () =>
{
    let commands = readdirSync("./commands").filter((f) => f.endsWith(".js"));

    for (let file of commands)
    {
        let pull = require(`../commands/${file}`);

        if (pull.help.name)
        {
            table.addRow(file, `:white_check_mark: Loaded!`);
            this[file.replace(/(\.js)/, ``)] = `${file}`;
        } else
            if (pull && !pull.help.name)
            {
                table.addRow(file, `:x: Loaded without help module.`);
                this[file.replace(/(\.js)/, ``)] = `${file}`;
            }
    }
};