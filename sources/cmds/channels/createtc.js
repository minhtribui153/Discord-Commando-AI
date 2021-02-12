const Commando = require('discord.js-commando')

module.exports = class CreateTCCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'createtc',
            group: 'channels',
            memberName: 'createtc',
            description: 'Creates a Text Channel',
            argsType: 'multiple',
            format: '<channel_name>',
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
        const name = message.content.replace(`${guild.commandPrefix}createtc `, '');

        message.guild.channels
            .create(name, {
                type: 'text',    
            })
            .then((channel) => {})
    }
}