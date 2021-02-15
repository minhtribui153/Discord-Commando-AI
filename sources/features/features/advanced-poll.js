const pollSchema = require('@schemas/poll-schema')

let pollCache = {} // { guildId: channelId }

const fetchPollingChannels = async (guildId) => {
    let query = {}

    if (guildId) {
        query._id = guildId
    }

    const results = await pollSchema.find(query)

    for (const result of results) {
        const { _id, channelId } = result
        suggestionCache[_id] = channelId
    }
}

module.exports = (client) => {
    fetchPollingChannels()

    client.on('message', (message) => {
        const { guild, channel, content } = message

        if (!guild) return

        const cachedChannelId = pollCache[guild.id]
        if (cachedChannelId && cachedChannelId === channel.id && !member.user.bot) {
            const eachLine = content.split('\n')

            for (const line of eachLine) {
                if (line.includes('=')) {
                    const split = line.split('=')
                    const emoji = split[0].trim()
                    message.react(emoji)
                }
            }
        }
    })
}

module.exports.fetchPollingChannels = fetchPollingChannels

module.exports.pollCache = () => {
    return pollCache
}