/*
 * ====================NOTE====================
 *    This code was created by LostAndDead,
 *   please don't claim this as your own work
 *        https://github.com/LostAndDead
 * ============================================
 */

console.clear()

const Discord = require("discord.js");
const fs = require("fs");
const yaml = require('js-yaml');
const init_commands = require("./init_commands")

const bot = new Discord.Client({ disableEveryone: true});

let Config = null;
let calls = []

try {
    let fileContents = fs.readFileSync('./config.yml', 'utf8');
    Config = yaml.load(fileContents);
}
catch (e) {
    console.log(e);
}

//Create calls for slash commands
fs.readdir("./commands/", (err, file) => {

    if (err) console.log(err);

    let jsfile = file.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Cant Find Commands");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        let data = props.info
        calls.push(data)
    });
});

//creates data files if they dont exist
const data = new Uint8Array(Buffer.from('{"Leagues":{}}'));

fs.access("data.json", fs.F_OK, (err) => {
    if (err) {
        if(err.code == "ENOENT"){
            fs.writeFile("data.json", data, (err) => {
                if (err) throw err;
                console.log("Created data.json as it didnt exist")
                return
            })
        }else{
            console.error(err)
            return
        }
    }else{
        console.log("data.json already exists")
    }
})

// D.JS Client listeners
bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
//bot.on("debug", (e) => console.info(e));
bot.on('reconnecting', () => console.log('Reconnecting WS...'));
bot.on('disconnect', () => {
    console.log('Disconnected, trying to restart...');
    process.exit();
});

// NodeJS process listeners
process.on('unhandledRejection', console.error);
process.on('warning', console.warn);

bot.on("ready", async() => {

    await init_commands.sendCalls(bot, calls, Config.Setup.JustGuildCommands)

    console.log("\nThe bot is now online")
    console.log("Keep this window open for the bot to run\n")
    console.log(`Invite me to a server with the following link.\nhttps://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=2147609600&scope=bot%20applications.commands\n`);
    
    console.log("Press CTRL+C to exit\n")

    bot.ws.on("INTERACTION_CREATE", async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        //Load all the commands
        const ping = require("./commands/ping")
        const echo = require("./commands/echo")
        const league = require("./commands/league")
        const result = require("./commands/result")
        const table = require("./commands/table")
        const adjust = require("./commands/adjust")
        const help = require("./commands/help")

        switch(command){
            case "ping":
                ping.run(bot, interaction, args)
                break;
            case "echo":
                echo.run(bot, interaction, args)
                break;
            case "league":
                league.run(bot, interaction, args)
                break;
            case "result":
                result.run(bot, interaction, args)
                break;
            case "table":
                table.run(bot, interaction, args)
                break;
            case "adjust":
                adjust.run(bot, interaction, args)
                break;
            case "help":
                help.run(bot, interaction, args)
                break;
        }
    })

});

bot.login(Config.Setup.Token);