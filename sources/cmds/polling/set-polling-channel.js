const Commando = require('discord.js-commando')
const pollSchema = require('@schemas/poll-schema')
const { fetchPollingChannels } = require('@features/advanced-poll')

module.exports = class SetPollingChannelCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setpolls',
            group: 'polling',
            memberName: 'setpoll',
            userPermissions: [
                'ADMINISTRATOR'
            ],
            description: 'Sets a polling channel',
            details: 'This only sets the channel for polling. You can still use \'poll\' command for polls'
        })
    }

    run = async (message) => {
        const channel = message.mentions.channels.first() || message.channel

        const {
            guild: { id: guildId }
        } = message

        const channelId = channel.id

        await pollSchema.findOneAndUpdate({
            _id: guildId
        }, {
            _id: guildId,
            channelId,
        }, {
            upsert: true,
        })

        message.reply(`Suggestion channel has been set to ${channel}`)

        fetchPollingChannels(guildId)
    }
}