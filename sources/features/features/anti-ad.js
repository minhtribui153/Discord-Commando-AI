const Discord = require('discord.js')

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
  
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} has been warned`, member.user.displayAvatarURL())
        .setColor("#FF0000")
        .setDescription("This is because they used vulgarities/swearing on this server.")
        .setFooter("Please be more careful next time")
        .setTimestamp()
  
      const code = content.split('discord.gg/')[1]

      if (message.author === client.user) {
        return
      } else if (content.includes('discord.gg/')) {
        const isOurInvite = await isInvite(guild, code)
        await message.delete()
        await message.channel.send(embed)
        await message.author.send(`:angry: ${message.author}, please do not advertise or send invites inside the ${client.guilds.cache.get(guild.id)} server!`)
        if (!isOurInvite) {
          // we know that they are advertising an outside discord server
        }
      }
    })
}