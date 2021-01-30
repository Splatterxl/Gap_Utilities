// Thanks bread, very cool.
module.exports.run = async (bot, msg, args, db, flags, ctx) => {
  const request = require("node-superfetch");
  const semver = require("semver");
  const { stripIndents } = require("common-tags");
  const { dependencies } = require("../package.json");
  const needUpdate = [];
  for (const [dep, ver] of Object.entries(dependencies)) {
    const update = await parseUpdate(dep, ver);
    if (!update) continue;
    needUpdate.push(update);
  }

  if (!needUpdate.length)
    return ctx.respond(
      "All packages are up to date."
    );
  const updatesList = needUpdate.map(pkg => {
    const breaking = pkg.breaking ? " ⚠️" : "";
    return `${pkg.name} (${pkg.oldVer} -> ${pkg.newVer})${breaking}`;
  });
  ctx.respond(
    new ctx.Discord.MessageEmbed({
      color: "YELLOW",
      title: "Package Updates Available:",
      description: `${
        updatesList.length > 30
          ? `${updatesList
              .map((thing, i) => `#${i+1} ${thing}`)
              .slice(30)
              .join("\n")} and ${updatesList.length - 30} more...`
          : updatesList.map((thing, i) => `#${i+1} ${thing}`).join("\n")
      }`
    })
  );
  if (ctx.flags.includes("exec")) ctx.util.paginate((await ctx.util.exec([`echo "Updating ${needUpdate.length} packages..."`, ...needUpdate.map(v => `npm i ${v.name}@${v.newVer}`))], ctx)).match(/(.*){1,1850}/), ctx { msgOptions: { code: "xl" } })

  async function fetchVersion(dependency) {
    const { body } = await request.get(
      `https://registry.npmjs.com/${dependency}`
    );
    if (body.time.unpublished) return null;
    return body["dist-tags"].latest;
  }

  async function parseUpdate(dep, ver) {
    if (ver.startsWith("github:")) return null;
    const latest = await fetchVersion(dep);
    const clean = ver.replace(/^(\^|<=?|>=?|=|~)/, "");
    if (latest === clean) return null;
    return {
      name: dep,
      oldVer: clean,
      newVer: latest,
      breaking: !semver.satisfies(latest, ver)
    };
  }
};

module.exports.help = {
  name: ">updatepkgs",
  id: "updatepkgs",
  desc: "Updates all packages",
  example: "updatepkgs",
  category: "owner",
  whitelisted: true,
  aliases: ["updatepackages"]
};
