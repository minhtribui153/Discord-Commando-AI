const Commando = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class KickCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'info',
            group: 'server',
            memberName: 'info',
            description: 'Checks server information.'
        })
    }

    async run(message) {
        const { guild } = message

        const { name, region, memberCount, owner, afkTimeout, preferredLocale, description, afkChannel, systemChannel } = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server Information for '${name}'`)
            .setThumbnail(icon)
            .addFields(
                {
                    name: 'Region',
                    value: region,
                },

                {
                    name: 'No. of members',
                    value: memberCount,
                },

                {
                    name: 'Server Owner',
                    value: owner.user.tag,
                },

                {
                    name: 'AFK Timeout',
                    value: afkTimeout / 60,
                },

                {
                    name: 'AFK Channel',
                    value: afkChannel,
                },

                {
                    name: 'System Channel',
                    value: systemChannel,
                },

                {
                    name: 'Server Description',
                    value: description,
                },

                {
                    name: 'Preferred Locale',
                    value: preferredLocale,
                },
                
            )
            .setColor('#DD3300')
        
        message.channel.send(embed)
    }
}