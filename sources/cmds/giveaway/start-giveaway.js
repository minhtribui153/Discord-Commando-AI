const Commando = require('discord.js-commando')

module.exports = class StartGiveawayCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'startgiveaway',
            format: '<reactions>',
            group: 'giveaway',
            memberName: 'startgiveaway',
            description: 'Starts a Giveaway',
            userPermissions: [
                'ADMINISTRATOR'
            ]
        })
    }

    async run(message, args) {
        message.delete().then(() => {
            const { guild, channel } = message

            channel.messages.fetch({ limit: 1 }).then(messages => {
                message = messages.first()

                if (!message) {
                    channel.send(':x: Create a message for giveaway first before using this command!')
                    return
                }
                
                if (args.includes(':')) {
                    const split = args.split(':')
                    const emojiName = split[1]
                    args = guild.emojis.cache.find((emoji) => {
                        return emoji.name === emojiName
                    })
                }
                message.react(args)
            })
        })
    }
}