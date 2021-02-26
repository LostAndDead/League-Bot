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

    data.Leagues[interaction.channel_id].players[UserID].played ++

    switch(args.find(arg => arg.name.toLowerCase() == "result").value){
        case "win":
            data.Leagues[interaction.channel_id].players[UserID].wins ++
            data.Leagues[interaction.channel_id].players[UserID].total += 3
            utils.success(bot, interaction, `Congrats <@${UserID}> on the win!`)
            break;
        case "draw":
            data.Leagues[interaction.channel_id].players[UserID].draws ++
            data.Leagues[interaction.channel_id].players[UserID].total += 1
            utils.success(bot, interaction, `So close <@${UserID}>...`)
            break;
        case "lose":
            data.Leagues[interaction.channel_id].players[UserID].loses ++
            utils.success(bot, interaction, `Better luck next time <@${UserID}>`)
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
                    "name": "So you won eh? Pretty good",
                    "value": "win"
                },
                {
                    "name": "Draw? Not bad...",
                    "value": "draw"
                },
                {
                    "name": "Ah you lost... Well this is awkward",
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
