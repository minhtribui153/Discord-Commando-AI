const Discord = require('discord.js')

module.exports = (client) => {
    // This is all vulgarities contained. Note that they are listed out to
    // make sure that the bot regconise these to warn and ban the user.
    const vulgarities = [
        'fuck',
        'shit',
        'piss off',
        'dick head',
        'asshole',
        'son of a bitch',
        'bastard',
        'bitch',
        'damn',
        'bollocks',
        'bugger',
        'bloody hell',
        'choad',
        'crikey',
        'rubbish',
        'shag',
        'wanker',
        'taking the piss',
        'twat',
        'bloody oath',
        'get stuffed',
        'bugger me',
        'fair suck of the sav'
    ]
  
    client.on('message', (message) => {
      const { guild, member, content } = message

      const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} has been warned`, member.user.displayAvatarURL())
        .setColor("#FF0000")
        .setDescription("This is because they used vulgarities/swearing on this server.")
        .setFooter("Please be more careful next time")
        .setTimestamp()

      for (const vulgarity of vulgarities) {
          if (message.content.toLowerCase().includes(vulgarity)) {
              message.delete()
              message.author.send(`:angry: ${message.author}, please do not use vulgarities inside this server!\nYou are breaking rule 5 of this server.`)
              message.channel.send(embed)
          }
      }
    })
}