const proc = require("child_process"), fs = require("fs"), path = require("path")

module.exports.run = async (bot, msg, args, db) => {
  const now = Date.now();
  let m = await msg.reply("Writing folders...");
  proc.execSync(`cd tmp && cd tsc && mkdir ${now} && cd ${now} && mkdir src && mkdir src`);
  m = await m.edit("Done writing folders!\nWriting `tsconfig.json`...")
  fs.writeFileSync(path.join(__dirname, "..", "tmp", "tsc", now), `{"compilerOptions": {"alwaysStrict": true,"checkJs": true,"allowUnusedLabels": false,"allowUnreachableCode": false,"declaration": true,"declarationMap": true,"resolveJsonModule": true,"outDir": "dist/"},"include":["src/**/*"],"compileOnSave": false,"exclude":["dist/**"]}`);
  m = await m.edit("Done writing folders!\nDone writing `tsconfig.json`!\nWriting TypeScript file...");
  fs.writeFileSync(path.join(__dirname, "..", "tmp", "tsc", now, "index.ts"), `(()=>{try{console.log(${args.slice(1).replace(/\\/, "\\\\").replace(/\`/, "\\`")})}catch(e){console.log(e)}})()`);
  m = await m.edit("Done writing folders!\nDone writing `tsconfig.json`!\nDone writing TypeScript file!\nCompiling (this may take a while)...");
  let output = proc.execSync(`cd tmp && cd tsc && cd ${now} && tsc`).toString();
  if (output) return m.edit("Done writing folders!\nDone writing `tsconfig.json`!\nDone writing TypeScript file!\nCompiling failed with the following error:\n```ts\n"+output+"\n```");
  else {m = await m.edit("Done writing folders!\nDone writing `tsconfig.json`!\nDone writing TypeScript file!\nDone compiling!\nRunning code...");output = proc.execSync(`cd tmp && cd tsc && cd ${now} && cd dist && node index.js`).toString();
  m = await m.edit("Done writing folders!\nDone writing `tsconfig.json`!\nDone writing TypeScript file!\nDone compiling!\nDone running code! Output: ```js\n"+output+"\n```");
}
