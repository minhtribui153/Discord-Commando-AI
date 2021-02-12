const Commando = require('discord.js-commando')

module.exports = class EndGiveawayCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'endgiveaway',
            group: 'giveaway',
            memberName: 'endgiveaway',
            description: 'Ends a Giveaway',
            userPermissions: [
                'ADMINISTRATOR'
            ]
        })
    }

    async run(message, args) {
        message.delete().then(() => {
            const { channel } = message

            channel.messages.fetch({ limit: 1 }).then(async (messages) => {
                message = messages.first()

                if (!message) {
                    channel.send(':x: Create a message for giveaway first before using this command!')
                    return
                }

                const { users } = await message.reactions.cache.first().fetch()
                const reactionUsers = await users.fetch()

                const possibleWinners = reactionUsers.array().filter((user) => {
                    return !user.bot
                })

                const winner = possibleWinners[Math.floor(Math.random() * possibleWinners.length)]

                message.channel.send(`The Winner of this Giveaway is ${winner}!`)
            })
        })
    }
}