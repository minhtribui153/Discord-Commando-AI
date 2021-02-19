const Commando = require('discord.js-commando')
const modLogsChannelSchema = require('@schemas/mod-logs-channel-schema')
const language = require('@features/language')
const { fetchModLogChannels } = require('@features/mod-logs')

module.exports = class ModLogsChannelCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'modlogs',
            group: 'channels',
            memberName: 'modlogs',
            userPermissions: [
                'ADMINISTRATOR',
            ],
            description: 'Set a moderator text channel'
        })
    }

    run = async (message) => {
        const channel = message.mentions.channels.first() || message.channel

        const { guild } = message

        const channelId = channel.id

        await modLogsChannelSchema.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild.id,
            channelId,
        }, {
            upsert: true
        })

        message.reply(`${language(guild, 'MOD_CHANNEL_SET_TO')} ${channel}`)

        fetchModLogChannels(guild.id)
    }
}