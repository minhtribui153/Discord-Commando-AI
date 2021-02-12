module.exports = (client) => {
    const isInvite = async (guild, code) => {
      return await new Promise((resolve) => {
        guild.fetchInvites().then((invites) => {
          for (const invite of invites) {
            if (code === invite[0]) {
              resolve(true)
              return
            }
          }
  
          resolve(false)
        })
      })
    }
  
    client.on('message', async (message) => {
      const { guild, member, content } = message
  
      // discord.gg/23RAN4
  
      const code = content.split('discord.gg/')[1]

      if (message.author === client.user) {
        return
      } else if (content.includes('discord.gg/')) {
        const isOurInvite = await isInvite(guild, code)
        await message.delete()
        await message.channel.send(`:warning: ${message.author} has been warned.\nReason: (S1-SD5:192356) Breaking rule 4 of this server.`)
        await message.author.send(`:angry: ${message.author}, please do not advertise or send invites inside this server!\nYou are breaking rule 4 of this server.`)
        if (!isOurInvite) {
          // we know that they are advertising an outside discord server
        }
      }
    })
}