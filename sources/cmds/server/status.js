const Commando = require('discord.js-commando')
const { prefix } = require('@root/config.json')

module.exports = class StatusCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'status',
            group: 'server',
            memberName: 'status',
            format: '<status>',
            userPermissions: [
                'ADMINISTRATOR'
            ],
            description: 'Edits the status of the bot.',
            argsType: 'multiple',
        })
    }

    async run(message, args) {
        const content = args.join(' ')
        
        this.client.user.setPresence({
            activity: {
                name: content,
                type: 0
            }
        })
    }
}