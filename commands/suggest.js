const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    const suggestionsButtonRow = new Discord.MessageActionRow().addComponents(

        new Discord.MessageButton()
        .setCustomId('suggestion_accept')
        .setEmoji("✅")
        .setStyle('SUCCESS'),

        new Discord.MessageButton()
        .setCustomId('suggestion_deny')
        .setEmoji("❌")
        .setStyle('DANGER')
        

    );
    
    if (client.config.suggestion.toggle) {
;        const suggestionQuery = args.join(" ");
        if(!suggestionQuery) return message.reply("`Pls suggest something`");

        if (args) {

            let suggestionEmbed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}'s suggestion`, message.author.displayAvatarURL())
                .setDescription(`\`\`\`${args.join(" ")}\`\`\``)
                .setImage("https://cdn.discordapp.com/attachments/866351666226921474/926341974129254430/standard_48.gif")



            try {
                

                let channel = client.convertChannel(message.guild, client.config.suggestion.channelid)
                let suggestionMessage = await channel.send({
                    embeds: [suggestionEmbed],
                    components: [
                        suggestionsButtonRow
                    ]
                })

                await suggestionMessage.react('👍')
                await suggestionMessage.react('👎')
                return message.react("<a:yes:874500803073822740>");

            } catch (err) {
                return console.log(err)
            }

        } else {

            return message.channel.send("❌ You can't suggest nothing")

        }

    } else {

        return message.channel.send("❌ Suggestions are not enabled")

    }
//<a:yes:874500803073822740>

};

exports.help = {
    name: 'suggest',
    aliases: ['suggest'],
    description: 'Suggest something.',
    usage: ''
};