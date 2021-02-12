const Commando = require('discord.js-commando')
const suggestionSchema = require('@schemas/suggestions-schema')
const { fetchSuggestionChannels } = require('@features/advanced-suggestions')

module.exports = class SetSuggestionChannelCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setsuggestions',
            group: 'suggestions',
            memberName: 'setsuggestions',
            userPermissions: [
                'ADMINISTRATOR'
            ],
            description: 'Sets the suggestion channel'
        })
    }

    run = async (message) => {
        const channel = message.mentions.channels.first() || message.channel

        const {
            guild: { id: guildId }
        } = message

        const channelId = channel.id

        await suggestionSchema.findOneAndUpdate({
            _id: guildId
        }, {
            _id: guildId,
            channelId,
        }, {
            upsert: true,
        })

        message.reply(`Suggestions channel has been set to ${channel}`)

        fetchSuggestionChannels(guildId)
    }
}