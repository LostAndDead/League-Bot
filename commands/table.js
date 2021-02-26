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

    let data = await utils.loadData()

    if(!data.Leagues[interaction.channel_id]){
        return utils.error(bot, interaction, "This is not a league channel")
    }

    //The SORT!
    var players = data.Leagues[interaction.channel_id].players
    
    var simpleData = {}
    for(var player in players){
        simpleData[player] = players[player].total
    }

    var sortable = []
    for (var item in simpleData){
        sortable.push([item, simpleData[item]])
    }

    sortable.sort(function(a,b){
        return b[1] - a[1]
    })

    var objSorted = {}
    sortable.forEach(function(item){
        objSorted[item[0]]=item[1]
    })

    var sortedData = {}
    for(var item in objSorted){
        sortedData[item] = players[item]
    }

    if(Object.keys(objSorted).length <= 0){
        return utils.error(bot, interaction, "There are no scores for this league")
    }

    var message = ""
    var place = 1
    var first = true
    var url
    for(player in sortedData){
        var guild = await bot.guilds.cache.find(guild => guild.id == interaction.guild_id)
        var user = await guild.members.cache.find(user => user.id == player).user
        if(first){
            url = user.displayAvatarURL()
            first = false
        }
        if(sortedData[player].adjusted == 0){
            message += `
            **${place}.** ${user.username} » **${sortedData[player].total}**
            \`| Played: ${sortedData[player].played} | Won: ${sortedData[player].wins} | Lost: ${sortedData[player].loses} | Drew: ${sortedData[player].draws} |\`
            `
        }else{
            message += `
            **${place}.** ${user.username} » **${sortedData[player].total}**
            \`| Played: ${sortedData[player].played} | Won: ${sortedData[player].wins} | Lost: ${sortedData[player].loses} | Drew: ${sortedData[player].draws} | Adjusted: ${sortedData[player].adjusted} |\`
            `
        }
        
        place ++
    }

    var embed = new Discord.MessageEmbed()
        .setColor("0xd47c25")
        .setThumbnail(url)
        .setDescription(message)
        .setTitle(`League Table For **${data.Leagues[interaction.channel_id].cn}**`);

    utils.sendEmbed(bot, interaction, embed)
    
};

module.exports.info = {
    "name": "table",
    "description": "See the league table"
};
