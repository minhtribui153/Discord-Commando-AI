const channelId = '795637685922430977'

const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId)
    channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
}


module.exports = (client) => {
    client.on('guildMemberAdd', (member) => updateMembers(member.guild))
    client.on('guildMemberRemove', (member) => updateMembers(member.guild))

    client.on('ready', () => {
        const guilds = client.guilds.cache.get('795605968112058378')
        updateMembers(guilds, cachedChannelId)
    })
  }