const Commando = require('discord.js-commando')
const { fetchModLogChannels, ModCache } = require('../../features/features/mod-logs')
const language = require('@features/language')

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
            message.reply(`${language(guild, 'AN_ERROR_OCCURRED_PLEASE_REPORT_THIS')}`)
            return
        }

        const channel = guild.channels.cache.get(channelId)
        if (!channel) {
            message.reply(`${language(guild, 'MOD_CHANNEL_UNEXIST')}`)
            return
        }

        message.reply(`${language(guild, 'CURRENT_MOD_CHANNEL')} <#${channelId}>`)
    }
}