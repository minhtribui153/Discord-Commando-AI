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

      for (const vulgarity of vulgarities) {
          if (message.content.toLowerCase().includes(vulgarity)) {
              message.delete()
              message.author.send(`:angry: ${message.author}, please do not use vulgarities inside this server!\nYou are breaking rule 5 of this server.`)
              message.channel.send(`:warning: ${message.author} has been warned.\nReason: (S1-SD5:290454) Breaking rule 5 of this server.`)
          }
      }
    })
}