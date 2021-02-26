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

    const Config = await utils.loadConfig()
    const data = await utils.loadData()

    if(!interaction.member.roles.includes(Config.Setup.StaffRoleID)){
        return utils.error(bot, interaction, "You do not have permission to make me ignore people")
    }
    var guild = await bot.guilds.cache.find(guild => guild.id == interaction.guild_id)
    var member = await guild.members.cache.find(user => user.id == (args.find(arg => arg.name.toLowerCase() == "user").value))

    if(member.roles.cache.some(role => role.id == Config.Setup.StaffRoleID) || args.find(arg => arg.name.toLowerCase() == "user").value == guild.ownerID){
        return utils.error(bot, interaction, "I cant ignore this person")
    }else if(data.Ignore.includes(args.find(arg => arg.name.toLowerCase() == "user").value)){
        return utils.error(bot, interaction, "I am already ignoring this player\nUse /unignore to make me listen to them")
    }
    
    data.Ignore.push(args.find(arg => arg.name.toLowerCase() == "user").value)

    let embed = new Discord.MessageEmbed()
        .setTitle("✅ Added To Ignore List ✅")
        .setDescription(`I will now ignore ${member.user.username}`)
        .setColor("0x00FF00")
    utils.sendEmbed(bot, interaction, embed)

    utils.saveData(data)
};

module.exports.info = {
    "name": "ignore",
    "description": "Is someone being annoying? Do you want me to ignore them?",
    "options": [
        {
            "name": "user",
            "description": "Who do you want me to ignore?",
            "type": 6,
            "required": true
        }
    ]
};
