/*
 * ====================NOTE====================
 *    This code was created by LostAndDead,
 *   please don't claim this as your own work
 *        https://github.com/LostAndDead
 * ============================================
 */

const yaml = require('js-yaml');
const fs = require("fs");
const fetch = require("node-fetch")
const utils = require('./utils');

module.exports.sendCalls = async(bot, calls, justGuild) => {

    let Config = await utils.loadConfig()

    let apiEndpoint
    if (justGuild) {
        apiEndpoint = `https://discord.com/api/v8/applications/${bot.user.id}/guilds/${Config.Setup.GuildID}/commands`
        console.log("Submitting commands to guild only")
    }else {
        apiEndpoint = `https://discord.com/api/v8/applications/${bot.user.id}/commands`
        console.log("Submitting commands GLOBALY")
    }


    for(let command of calls){
        let res = await fetch(apiEndpoint, {
            method: "post",
            body: JSON.stringify(command),
            headers: {
                "Authorization": "Bot " + Config.Setup.Token,
                "Content-Type": "application/json"
            }
        })

        const json = await res.json()
        if(json.code){
            console.log(json)
        }

        console.log("Setup " + command.name)
    }
}
