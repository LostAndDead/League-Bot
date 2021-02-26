/*
 * ====================NOTE====================
 *    This code was created by LostAndDead,
 *   please don't claim this as your own work
 *        https://github.com/LostAndDead
 * ============================================
 */

const Discord = require("discord.js");
const utils = require("../utils")

module.exports.run = async(bot, interaction, args) => {

    var Color

    if(args.find(arg => arg.name.toLowerCase() == "color")){
        Color = args.find(arg => arg.name.toLowerCase() == "color").value
    }else {
        Color = Math.floor(Math.random()*16777215).toString(16);
    }

    const embed = new Discord.MessageEmbed()
        .setDescription("```" + args.find(arg => arg.name.toLowerCase() == "message").value + "```")
        .setAuthor(interaction.member.user.username + " made me say:")
        .setColor(`0x${Color}`);

    await utils.sendEmbed(bot, interaction, embed)
};

module.exports.info = {
    "name": "echo",
    "description": "Good ol' call and response",
    "options": [
        {
            "name": "message",
            "description": "What you want me to say.",
            "type": 3,
            "required": true
        },
        {
            "name": "color",
            "description": "Submit a hex code for a custom color for the reply. Such as FF0000 for red.",
            "type": 3,
            "required": false
        }
    ]
};
