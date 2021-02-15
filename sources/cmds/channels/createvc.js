const Commando = require('discord.js-commando')

module.exports = class CreateTextChannelCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'createvc',
            group: 'channels',
            format: '<channel_name>',
            memberName: 'createvc',
            description: 'Creates a Voice Channel',
            argsType: 'multiple',
            clientPermissions: [
                'MANAGE_CHANNELS'
            ],
            userPermissions: [
                'MANAGE_CHANNELS'
            ],
            examples: ['createvc Gaming', 'createvc Music', 'createvc Meeting', 'createvc Among Us'],
        })
    }

    async run(message, args) {
        const { guild } = message
        const name = args.join('')

        message.guild.channels
            .create(name, {
                type: 'voice',    
            })
            .then((channel) => {
                channel.setUserLimit(50)
            })
    }
}