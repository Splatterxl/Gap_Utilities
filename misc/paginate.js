module.exports = (m, pages, ctx) => {
            let index = 0;
            
            function up() { m.edit(pages[index]); };
            up();
            ["⏮","◀️","▶️","⏭"].map(v => m.react(v));
            const collector = m.createReactionCollector((r, u) => (u.id === ctx.message.author.id));
            collector.on('collect', (r) =>
            {
                switch (r.emoji.name)
                {
                   
                    case "▶️":
                        index = (index == (evaled.length - 1)) ? index : index + 1;
                        up();
                        break;
                    case "◀️":
                        index = index ? index - 1 : index;
                        up();
                        break;
                    case "⏮":
                        index = 0;
                        up();
                        break;
                    case "⏭":
                        index = evaled.length - 1;
                        up();
                        break;
                    
                }
            });

}
