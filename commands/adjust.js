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

    let Config = await utils.loadConfig()

    if(!interaction.member.roles.includes(Config.Setup.StaffRoleID)){
        return utils.error(bot, interaction, "You do not have permission to adjust scores")
    }

    let data = await utils.loadData()
    
    if(args.find(arg => arg.name.toLowerCase() == "add")){

        args = args.find(arg => arg.name.toLowerCase() == "add").options

        if(!data.Leagues[interaction.channel_id].players[args.find(arg => arg.name.toLowerCase() == "user").value]){
            return utils.error(bot, interaction, "That player is not in the League")
        }

        if(args.find(arg => arg.name.toLowerCase() == "ammount").value > 50){
            return utils.error(bot, interaction, "Ammount cant be bigger than 50")
        }

        var oldPlayer = {...data.Leagues[interaction.channel_id].players[args.find(arg => arg.name.toLowerCase() == "user").value]}

        data.Leagues[interaction.channel_id].players[args.find(arg => arg.name.toLowerCase() == "user").value].adjusted += args.find(arg => arg.name.toLowerCase() == "ammount").value
        data.Leagues[interaction.channel_id].players[args.find(arg => arg.name.toLowerCase() == "user").value].total += args.find(arg => arg.name.toLowerCase() == "ammount").value

        var newPlayer = data.Leagues[interaction.channel_id].players[args.find(arg => arg.name.toLowerCase() == "user").value]

        var guild = bot.guilds.cache.find(guild => guild.id == interaction.guild_id)
        var user = await guild.members.fetch(args.find(arg => arg.name.toLowerCase() == "user").value)

        let embed = new Discord.MessageEmbed()
            .setTitle("⬆️ Points Updated ⬆️")
            .setDescription(`${user.displayName} points adjusted from:
            \`| Total: ${oldPlayer.total} | Adjusted: ${oldPlayer.adjusted} |\`
            To:
            \`| Total: ${newPlayer.total} | Adjusted: ${newPlayer.adjusted} |\``)
            .setColor("0x00FF00")
        utils.sendEmbed(bot, interaction, embed)

    }else if (args.find(arg => arg.name.toLowerCase() == "remove")){

        args = args.find(arg => arg.name.toLowerCase() == "remove").options

        if(!data.Leagues[interaction.channel_id].players[args.find(arg => arg.name.toLowerCase() == "user").value]){
            return utils.error(bot, interaction, "That player is not in the League")
        }

        if(args.find(arg => arg.name.toLowerCase() == "ammount").value > 50){
            return utils.error(bot, interaction, "Ammount cant be bigger than 50")
        }

        var oldPlayer = {...data.Leagues[interaction.channel_id].players[args.find(arg => arg.name.toLowerCase() == "user").value]}

        data.Leagues[interaction.channel_id].players[args.find(arg => arg.name.toLowerCase() == "user").value].adjusted -= args.find(arg => arg.name.toLowerCase() == "ammount").value
        data.Leagues[interaction.channel_id].players[args.find(arg => arg.name.toLowerCase() == "user").value].total -= args.find(arg => arg.name.toLowerCase() == "ammount").value

        var newPlayer = data.Leagues[interaction.channel_id].players[args.find(arg => arg.name.toLowerCase() == "user").value]

        var guild = bot.guilds.cache.find(guild => guild.id == interaction.guild_id)
        var user = await guild.members.fetch(args.find(arg => arg.name.toLowerCase() == "user").value)

        let embed = new Discord.MessageEmbed()
            .setTitle("⬇️ Points Updated ⬇️")
            .setDescription(`${user.displayName} points adjusted from:
            \`| Total: ${oldPlayer.total} | Adjusted: ${oldPlayer.adjusted} |\`
            To:
            \`| Total: ${newPlayer.total} | Adjusted: ${newPlayer.adjusted} |\``)
            .setColor("0x00FF00")
        utils.sendEmbed(bot, interaction, embed)

    }else if (args.find(arg => arg.name.toLowerCase() == "reset")){

        args = args.find(arg => arg.name.toLowerCase() == "reset").options

        if(!data.Leagues[interaction.channel_id].players[args.find(arg => arg.name.toLowerCase() == "user").value]){
            return utils.error(bot, interaction, "That player is not in the League")
        }

        data.Leagues[interaction.channel_id].players[args.find(arg => arg.name.toLowerCase() == "user").value] = {
            "played": 0,
            "wins": 0,
            "loses": 0,
            "draws": 0,
            "total": 0,
            "adjusted": 0
        }

        var guild = bot.guilds.cache.find(guild => guild.id == interaction.guild_id)
        var user = await guild.members.fetch(args.find(arg => arg.name.toLowerCase() == "user").value)

        let embed = new Discord.MessageEmbed()
            .setTitle("🔄 Points Reset 🔄")
            .setDescription(`Points reset for ${user.displayName}`)
            .setColor("0x00FF00")
        utils.sendEmbed(bot, interaction, embed)

    }

    utils.saveData(data)
};

module.exports.info = {
    "name": "adjust",
    "description": "Adjust a players scores for the league. Has to be ran in the league channel you want to change",
    "options": [
        {
            "name": "add",
            "description": "Adds points to a player",
            "type": 1,
            "options": [
                {
                    "name": "user",
                    "description": "The user to add points too",
                    "type": 6,
                    "required": true
                },
                {
                    "name": "ammount",
                    "description": "The ammount to increase the score by (Max 50)",
                    "type": 4,
                    "required": true
                }
            ]
        },
        {
            "name": "remove",
            "description": "Removes points from a player",
            "type": 1,
            "options": [
                {
                    "name": "user",
                    "description": "The user to remove points from",
                    "type": 6,
                    "required": true
                },
                {
                    "name": "ammount",
                    "description": "The ammount to decrease the score by (Max 50)",
                    "type": 4,
                    "required": true
                }
            ]
        },
        {
            "name": "reset",
            "description": "Reset all scores for a player",
            "type": 1,
            "options": [
                {
                    "name": "user",
                    "description": "The user to remove points from",
                    "type": 6,
                    "required": true
                }
            ]
        }
    ]
};
