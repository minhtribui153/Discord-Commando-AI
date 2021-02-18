const Commando = require('discord.js-commando')
const language = require('../../features/features/language')

module.exports = class CreateTextChannelCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'deletetc',
            group: 'channels',
            memberName: 'deletetc',
            description: 'Deletes a Text Channel',
            argsType: 'multiple',
            clientPermissions: [
                'MANAGE_CHANNELS'
            ],
            userPermissions: [
                'MANAGE_CHANNELS'
            ]
        })
    }

    async run(message, args) {
        const { guild } = message
        let filter = m => m.author.id === message.author.id

        message.channel.send(`:question: ${language(guild, 'ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_CHANNEL_THIS_ACTION_IS_IRREVERSIBLE')} (Yes/No)`)
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        })
        .then(message => {
            message = message.first()
            if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
                message.channel.delete()
            } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
              message.channel.send(`:x: ${language(guild, 'DELETE_ABORTED')} Delete Aborted.`)
              return
            } else {
              message.channel.send(`:x: Invalid Response`)
              return
            }
        })
        .catch(collected => {
            message.channel.send(`:x: You took too long to answer. Type ${guild.commandPrefix}deletetc to try again.`)
            return
        })
    }
}