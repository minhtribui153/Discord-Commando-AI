const Commando = require('discord.js-commando')
const { prefix } = require('@root/config.json')

module.exports = class StatusCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'status',
            group: 'server',
            memberName: 'status',
            format: '<status>',
            description: 'Edits the status of the bot.',
        })
    }

    async run(message) {
        const content = message.content.replace(`${prefix}status`, '');
        
        client.user.setPresence({
            activity: {
                name: content,
                type: 0
            }
        })
    }
}