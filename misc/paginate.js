module.exports = async (pages, ctx, opts) => {
            let index = 0;
            if (!pages) return;
            if (!pages[0]) pages[0] = opts.default;
            let m = opts.respond ? await ctx.respond(pages[index]) : await ctx.message.channel.send(pages[index])
            function up() { m.edit(pages[index]); };
            up();
            pages.length > 1 ? ["⏮","◀️","▶️","⏭"].map(v => m.react(v)) : null;
            const collector = m.createReactionCollector((r, u) => (u.id === ctx.message.author.id));
            collector.on('collect', (r) =>
            {
                switch (r.emoji.name)
                {
                   
                    case "▶️":
                        index = (index == (pages.length - 1)) ? index : index + 1;
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
                        index = pages.length - 1;
                        up();
                        break;
                    
                }
            });

}
