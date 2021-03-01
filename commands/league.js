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
        return utils.error(bot, interaction, "You do not have permission to manage leagues")
    }

    let data = await utils.loadData()

    if(args.find(arg => arg.name.toLowerCase() == "setup")){

        args = args.find(arg => arg.name.toLowerCase() == "setup").options

        if(args.find(arg => arg.name.toLowerCase() == "common_name").value.length > 20){
            return utils.error(bot, interaction, "Name can not excede 20 characters")
        }

        if(data.Leagues[interaction.channel_id]){
            utils.error(bot, interaction, "A League already exists for this channel")
        }else{
            data.Leagues[interaction.channel_id] = {
                "cn": args.find(arg => arg.name.toLowerCase() == "common_name").value,
                "players": {}
            }
            let embed = new Discord.MessageEmbed()
                .setTitle("✅ League Created ✅")
                .setDescription(`Successfully created **${data.Leagues[interaction.channel_id].cn}** in <#${interaction.channel_id}>`)
                .setColor("0x00FF00")
            utils.sendEmbed(bot, interaction, embed)
        }
    }else if (args.find(arg => arg.name.toLowerCase() == "delete")){

        if(!data.Leagues[interaction.channel_id]){
            return utils.error(bot, interaction, "This is not a league channel")
        }

        let embed = new Discord.MessageEmbed()
            .setTitle("❌ League Deleted ❌")
            .setDescription(`Successfully removed **${data.Leagues[interaction.channel_id].cn}** from <#${interaction.channel_id}>`)
            .setColor("0xFF0000")
        utils.sendEmbed(bot, interaction, embed)
        delete data.Leagues[interaction.channel_id]
    }else if (args.find(arg => arg.name.toLowerCase() == "reset")){

        if(!data.Leagues[interaction.channel_id]){
            return utils.error(bot, interaction, "This is not a league channel")
        }

        data.Leagues[interaction.channel_id].players = {}
        let embed = new Discord.MessageEmbed()
            .setTitle("🔄 League Reset 🔄")
            .setDescription(`Successfully reset all player data for **${data.Leagues[interaction.channel_id].cn}**`)
            .setColor("0xFFA500")
        utils.sendEmbed(bot, interaction, embed)
    }

    utils.saveData(data)

};

module.exports.info = {
    "name": "league",
    "description": "Manage leagues",
    "options": [
        {
            "name": "setup",
            "description": "Setup a new league in the current channel",
            "type": 1,
            "options": [
                {
                    "name": "common_name",
                    "description": "A common/readable name for the league",
                    "type": 3,
                    "required": "true"
                }
            ]
        },
        {
            "name": "delete",
            "description": "Deletes a league, must be ran in the league channel",
            "type": 1
        },
        {
            "name": "reset",
            "description": "Resets all the league player data",
            "type": 1
        }
    ]
};
