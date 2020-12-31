const proc = require("child_process"), fs = require("fs"), path = require("path")

module.exports.run = async (bot, msg, args, db) => {
if (!args[1]) return msg.reply("Please provide some TypeScript code for me to compile and run!")
  const now = Date.now().toString();
  let output;
  let m = await msg.reply("Writing folders...");
  proc.execSync(`cd tmp && cd tsc && mkdir ${now} && cd ${now} && mkdir src && mkdir dist`);
  m = await m.edit("Done writing folders!\nWriting `tsconfig.json`...")
  fs.writeFileSync(path.join(__dirname, "..", "tmp", "tsc", now, "tsconfig.json"), `{"compilerOptions": {"alwaysStrict": true,"checkJs": true,"allowUnusedLabels": false,"allowUnreachableCode": false,"declaration": true,"declarationMap": true,"resolveJsonModule": true,"outDir": "dist/"},"include":["src/**/*"],"compileOnSave": false,"exclude":["dist/**"]}`);
  m = await m.edit("Done writing folders!\nDone writing `tsconfig.json`!\nWriting TypeScript file...");
  fs.writeFileSync(path.join(__dirname, "..", "tmp", "tsc", now, "src", "index.ts"), `(()=>{try{console.log(${args.slice(1).join(" ").replace(/\\/, "\\\\").replace(/\`/, "\\`")})}catch(e){console.log(e)}})()`);
  m = await m.edit("Done writing folders!\nDone writing `tsconfig.json`!\nDone writing TypeScript file!\nCompiling (this may take a while)...");
  try{output = proc.execSync(`cd tmp && cd tsc && cd ${now} && tsc`).toString();}catch(e){output = "[COMPILER ERROR] It seems as though an error occurred. Try putting your code through a linter and try again!"}
  if (output) {return m.edit("Done writing folders!\nDone writing `tsconfig.json`!\nDone writing TypeScript file!\nCompiling failed with the following error:\n```ts\n"+output+"\n```");}
  else {m = await m.edit("Done writing folders!\nDone writing `tsconfig.json`!\nDone writing TypeScript file!\nDone compiling!\nRunning code...");output = proc.execSync(`cd tmp && cd tsc && cd ${now} && cd dist && node index.js`).toString();}
  m = await m.edit("Done writing folders!\nDone writing `tsconfig.json`!\nDone writing TypeScript file!\nDone compiling!\nDone running code! Output: ```js\n"+output+"\n```");
}
