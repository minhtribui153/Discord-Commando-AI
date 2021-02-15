const Commando = require('discord.js-commando')

module.exports = class ClearCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'clear_channel',
            group: 'moderation',
            memberName: 'clear_channel',
            description: 'Clears the channel',
            argsType: 'multiple',
            clientPermissions: [
                'MANAGE_MESSAGES'
            ],
            userPermissions: [
                'MANAGE_MESSAGES'
            ]
        })
    }

    async run(message, args) {
        message.channel.messages.fetch().then(results => {
            message.channel.bulkDelete(results)
        })
    }
}