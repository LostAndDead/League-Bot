/*
 * ====================NOTE====================
 *    This code was created by LostAndDead,
 *   please don't claim this as your own work
 *        https://github.com/LostAndDead
 * ============================================
 */

const Discord = require("discord.js");
const utils = require("../utils")
const pjson = require("../package.json")

module.exports.run = async(bot, interaction, args) => {

    let embed = new Discord.MessageEmbed()
    .setTitle("Bot help/info")
    .addField("Commands", "I dont need to list commands here as discord does it fore me, just type a `/` and my commands will apear in the list as well as options and arguments!")
    .addField("Info", `Current Version: ${pjson.version}`)
    
};

module.exports.info = {
    "name": "help",
    "description": "Kind of self explanatory"
};
