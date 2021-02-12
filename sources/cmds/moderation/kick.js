const Commando = require('discord.js-commando')

module.exports = class KickCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            format: '<member>',
            description: 'Kicks a member from the discord server',
            clientPermissions: [
                'KICK_MEMBERS'
            ],
            userPermissions: [
                'KICK_MEMBERS'
            ]
        })
    }

    async run(message) {
        const target = message.mentions.users.first()
        if (!target) {
            message.channel.send(`:x: ${tag}, Please specify a member to kick.`)
            return
        }

        const { guild } = message

        const member = guild.members.cache.get()
        if (member.kickable) {
            member.kick()
            message.channel.send(`:white_check_mark: ${tag}, that member has been kicked out of this server.`)
        } else {
            message.channel.send(`:x: ${tag}, I have no permission to kick this member.`)
        }
    }
}