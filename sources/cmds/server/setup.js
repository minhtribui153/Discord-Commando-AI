const Commando = require('discord.js-commando')

module.exports = class SetupCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setup',
            group: 'server',
            memberName: 'setup',
            userPermissions: [
                'ADMINISTRATOR'
            ],
            description: 'Setups the bot',
        })
    }

    run = async (message) => {
        let msg = '```\n----- Setup Bot -----\nUse these following commands to setup the bot\n'

        msg += '\nSet Suggestion Channels - ^setsuggestions <channel_mention:Optional>'
        msg += '\nSet Among Us Category - ^among-us-cat <category_id:Required>'
        msg += '\nSet Thanks Leaderboard - ^setleaderboard'
        msg += '\n```'

        message.reply(msg)
    }
}