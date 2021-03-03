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

    let UserID = interaction.member.user.id
    let data = await utils.loadData()
    let Config = await utils.loadConfig()
    var d = new Date();

    if(!data.Leagues[interaction.channel_id]){
        return utils.error(bot, interaction, "This is not a league channel")
    }

    if(args.find(arg => arg.name.toLowerCase() == "user")){
        if(!interaction.member.roles.includes(Config.Setup.StaffRoleID)){
            return utils.error(bot, interaction, "You do not have permission to add results for other users.")
        }else{
            UserID = args.find(arg => arg.name.toLowerCase() == "user").value
        }
    }
    
    if(!data.Leagues[interaction.channel_id].players[UserID]){
        data.Leagues[interaction.channel_id].players[UserID] = {
            "played": 0,
            "wins": 0,
            "loses": 0,
            "draws": 0,
            "total": 0,
            "adjusted": 0
        }
    }

    switch(args.find(arg => arg.name.toLowerCase() == "result").value){
        case "win":
            data.Leagues[interaction.channel_id].players[UserID].played ++
            data.Leagues[interaction.channel_id].players[UserID].wins ++
            data.Leagues[interaction.channel_id].players[UserID].total += 3
            utils.success(bot, interaction, `Congrats <@${UserID}> on the win!`)
            var guild = await bot.guilds.cache.find(guild => guild.id == interaction.guild_id)
            var user = await guild.members.cache.find(user => user.id == UserID).user
            var author = await guild.members.cache.find(user => user.id == interaction.member.user.id).user
            console.log('-------------------- Result Added --------------------')
            console.log('Result: Win')
            console.log(`Message Author: ${author.username} | ID: ${author.id}`)
            console.log(`Result For: ${user.username} | ID: ${user.id}`)
            console.log(`New Data: Played: ${data.Leagues[interaction.channel_id].players[UserID].played} | Wins: ${data.Leagues[interaction.channel_id].players[UserID].wins} | Total: ${data.Leagues[interaction.channel_id].players[UserID].total}`)
            console.log(`Time: ${d}`)
            console.log('------------------------------------------------------')
            break;
        case "draw":
            data.Leagues[interaction.channel_id].players[UserID].played ++
            data.Leagues[interaction.channel_id].players[UserID].draws ++
            data.Leagues[interaction.channel_id].players[UserID].total += 1
            utils.success(bot, interaction, `So close <@${UserID}>...`)
            var guild = await bot.guilds.cache.find(guild => guild.id == interaction.guild_id)
            var user = await guild.members.cache.find(user => user.id == UserID).user
            var author = await guild.members.cache.find(user => user.id == interaction.member.user.id).user
            console.log('-------------------- Result Added --------------------')
            console.log('Result: Draw')
            console.log(`Message Author: ${author.username} | ID: ${author.id}`)
            console.log(`Result For: ${user.username} | ID: ${user.id}`)
            console.log(`New Data: Played: ${data.Leagues[interaction.channel_id].players[UserID].played} | Draws: ${data.Leagues[interaction.channel_id].players[UserID].draws} | Total: ${data.Leagues[interaction.channel_id].players[UserID].total}`)
            console.log(`Time: ${d}`)
            console.log('------------------------------------------------------')
            break;
        case "lose":
            data.Leagues[interaction.channel_id].players[UserID].played ++
            data.Leagues[interaction.channel_id].players[UserID].loses ++
            utils.success(bot, interaction, `Better luck next time <@${UserID}>`)
            var guild = await bot.guilds.cache.find(guild => guild.id == interaction.guild_id)
            var user = await guild.members.cache.find(user => user.id == UserID).user
            var author = await guild.members.cache.find(user => user.id == interaction.member.user.id).user
            console.log('-------------------- Result Added --------------------')
            console.log('Result: Loss')
            console.log(`Message Author: ${author.username} | ID: ${author.id}`)
            console.log(`Result For: ${user.username} | ID: ${user.id}`)
            console.log(`New Data: Played: ${data.Leagues[interaction.channel_id].players[UserID].played} | Wins: ${data.Leagues[interaction.channel_id].players[UserID].loses} | Total: ${data.Leagues[interaction.channel_id].players[UserID].total}`)
            console.log(`Time: ${d}`)
            console.log('------------------------------------------------------')
            break;
    }

    utils.saveData(data)


};

module.exports.info = {
    "name": "result",
    "description": "Submit a result of a match for you or another user",
    "options" : [
        {
            "name": "result",
            "description": "The result of the match",
            "type": 3,
            "required": true,
            "choices": [
                {
                    "name": "Victory",
                    "value": "win"
                },
                {
                    "name": "Draw",
                    "value": "draw"
                },
                {
                    "name": "Defeat",
                    "value": "lose"
                }
            ]
        },
        {
            "name": "user",
            "description": "Submit a result for another user. Requires Staff",
            "type": 6,
            "required": false
        }
    ]
};
