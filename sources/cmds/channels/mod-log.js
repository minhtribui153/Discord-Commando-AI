const Commando = require('discord.js-commando')
const { fetchModLogChannels, ModCache } = require('../../features/features/mod-logs')

module.exports = class ModLogCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'modlog',
            group: 'channels',
            memberName: 'modlog',
            userPermissions: [
                'ADMINISTRATOR'
            ],
            description: 'Checks for current moderator log channel'
        })
    }

    run = async (message) => {
        const { guild } = message

        const channelId = ModCache()[guild.id]
        if (!channelId) {
            message.reply('An error occurred, please report this')
            return
        }

        const channel = guild.channels.cache.get(channelId)
        if (!channel) {
            message.reply('The moderator logs channel no longer exists')
            return
        }

        message.reply(`The current moderator logs channel is <#${channelId}>`)
    }
}