module.exports = (client) => {
    const channelId = '795637685922430977'
  
    const updateMembers = (guild) => {
        const channel = guild.channels.cache.get(channelId)
        channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
    }
    
    client.on('guildMemberAdd', (member) => updateMembers(member.guild))
    client.on('guildMemberRemove', (member) => updateMembers(member.guild))

    client.on('ready', () => {
        const guilds = client.guilds.cache.get('464316540490088448')
        updateMembers(guilds)
    })
  }