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

    if(!data.Ignore.includes(args.find(arg => arg.name.toLowerCase() == "user").value)){
        return utils.error(bot, interaction, "I wasnt ignoring this user, im all ears!")
    }

    for(var i in data.Ignore){
        if(data.Ignore[i] == args.find(arg => arg.name.toLowerCase() == "user").value){
            data.Ignore.splice(i,1);
            break;
        }
    }

    let embed = new Discord.MessageEmbed()
        .setTitle("✅ Removed From Ignore List ✅")
        .setDescription(`I will no longer ignore ${member.user.username}`)
        .setColor("0x00FF00")
    utils.sendEmbed(bot, interaction, embed)

    utils.saveData(data)
};

module.exports.info = {
    "name": "unignore",
    "description": "Sorry what was that? I was ignoring you. Oh dont want me to anymore, ok use this",
    "options": [
        {
            "name": "user",
            "description": "Who do you want me to pay attention no?",
            "type": 6,
            "required": true
        }
    ]
};
