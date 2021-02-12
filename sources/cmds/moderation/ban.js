const Commando = require('discord.js-commando')

module.exports = class BanCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            format: '<member>',
            memberName: 'ban',
            description: 'Bans a member from the discord server',
            clientPermissions: [
                'BAN_MEMBERS'
            ],
            userPermissions: [
                'BAN_MEMBERS'
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
        if (member.bannable) {
            member.ban()
            message.channel.send(`:white_check_mark: ${tag}, that member has been banned from this server.`)
        } else {
            message.channel.send(`:x: ${tag}, I have no permission to ban this member.`)
        }
    }
}