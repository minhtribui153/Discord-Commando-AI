const thanksLeaderboardSchema = require('@schemas/thanks-leaderboard-schema')
const thanksSchema = require('@schemas/thanks-schema')

// Variables
const seconds = 30

const fetchTopMembers = async (guildId) => {
  let text = ''

  const results = await thanksSchema
    .find({
      guildId,
    })
    .sort({
      received: -1,
    })
    .limit(10)

  for (let counter = 0; counter < results.length; ++counter) {
    const { userId, received = 0 } = results[counter]

    text += `#${counter + 1} <@${userId}> with ${received} thanks\n`
  }

  return text
}

const updateLeaderboard = async (client) => {
  const results = await thanksLeaderboardSchema.find({})

  for (const result of results) {
    const { channelId, _id: guildId } = result

    const guild = client.guilds.cache.get(guildId)
    if (guild) {
      const channel = guild.channels.cache.get(channelId)
      if (channel) {
        const messages = await channel.messages.fetch()
        const firstMessage = messages.first()

        let topMembers = 'Here is the Thanks Leaderboard. This is the first 10 People to be thanked:\n\n'
        topMembers += await fetchTopMembers(guildId)
        topMembers += `\nUpdating in ${seconds} seconds...`

        if (firstMessage) {
          firstMessage.edit(topMembers)
        } else {
          channel.send(topMembers)
        }

      }
    }
  }

  setTimeout(() => {
    updateLeaderboard(client)
  }, 1000 * seconds)
}

module.exports = async (client) => {
  updateLeaderboard(client)
}