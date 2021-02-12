const Commando = require('discord.js-commando')

module.exports = class NicknameCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'senddm',
            group: 'settings',
            memberName: 'senddm',
            userPermissions: [
                'ADMINISTRATOR'
            ],
            clientPermissions: [
                'ADMINISTRATOR'
            ],
            description: 'Sends a DM to user',
            argsType: 'multiple'
        })
    }

    run = (message, args) => {
        const target = message.mentions.users.first()

        if (!target) {
            message.channel.send(':x: (S1-SD5:204365) Please specify someone to send DM.')
            return
        }

        args.shift()

        const member = message.guild.members.cache.get(target.id)

        const msg = args.join(' ')

        member.send(msg)

        message.reply('Sent message to user!')
    }
}