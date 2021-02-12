const { MessageEmbed } = require('discord.js')
const suggestionSchema = require('@schemas/suggestions-schema')
const { prefix } = require('@root/config.json')

const statusMessages = {
  WAITING: {
    text: '📊 Waiting for community feedback, please vote!',
    color: 0xffea00,
  },
  ACCEPTED: {
    text: '✅ Accepted suggestion! Expect this soon.',
    color: 0x34eb5b,
  },
  DENIED: {
    text:
      '❌ Thank you for the suggestion, but we are not interested in this suggestion at this time.',
    color: 0xc20808,
  },
}

let suggestionCache = {} // { guildId: channelId }

const fetchSuggestionChannels = async (guildId) => {
  let query = {}

  if (guildId) {
    query._id = guildId
  }

  const results = await suggestionSchema.find(query)

  for (const result of results) {
    const { _id, channelId } = result
    suggestionCache[_id] = channelId
  }
}

module.exports = (client) => {
    fetchSuggestionChannels()

    client.on('message', (message) => {
        const { guild, channel, content, member } = message

        const cachedChannelId = suggestionCache[guild.id]
        if (cachedChannelId && cachedChannelId === channel.id && !member.user.bot) {
            message.delete()

            const status = statusMessages.WAITING

            const embed = new MessageEmbed()
                .setColor(status.color)
                .setAuthor(member.displayName, member.user.displayAvatarURL())
                .setDescription(content)
                .addFields({
                    name: 'Status',
                    value: status.text,
                })
                .setFooter('Want to suggest something? Simply type it in this channel')

                channel.send(embed).then((messages) => {
                    messages.react('👍').then(() => {
                    messages.react('👎')
                })
            })
        }
    })
}

module.exports.fetchSuggestionChannels = fetchSuggestionChannels

module.exports.statusMessages = statusMessages

module.exports.suggestionCache = () => {
    return suggestionCache
}