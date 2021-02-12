const Commando = require('discord.js-commando')

module.exports = class InvitesCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'invites',
            group: 'server',
            memberName: 'invites',
            description: 'Tracks invites to this server from members.',
            clientPermissions: [
                'ADMINISTRATOR'
            ],
            userPermissions: [
                'ADMINISTRATOR'
            ]
        })
    }

    async run(message) {
        const { guild } = message

        guild.fetchInvites().then((invites) => {
            const InviteCounter = {}

            invites.forEach((invite) => {
                const { uses, inviter } = invite
                const { username, discriminator } = inviter

                const name = `${username}#${discriminator}`
                
                InviteCounter[name] = (InviteCounter[name] || 0) + uses
            })

            let replyText = 'Invites:\n```\nMember | Members Invited:'

            for (const invite in InviteCounter) {
                const count = InviteCounter[invite]
                replyText += `\n${invite} | ${count} member(s)`
                replyText += '\n```'
            }

            message.channel.send(replyText)
        })
    }
}