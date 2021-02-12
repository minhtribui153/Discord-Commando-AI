const Commando = require('discord.js-commando')

module.exports = class KickCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'hasrole',
            group: 'role',
            format: '<member> <role>',
            argsType: 'multiple',
            memberName: 'hasrole',
            description: 'Checks if member has the role specified.',
            clientPermissions: [
                'ADMINISTRATOR'
            ],
            userPermissions: [
                'ADMINISTRATOR'
            ]
        })
    }

    async run(message, args) {
        const targetUser = message.mentions.users.first()
        if (!targetUser) {
            message.channel.send(':x: (S1-SD5:204365) Please specify someone to find out what role he/she has.')
            return
        }

        args.shift()

        const roleName = args.join(' ')
        const { guild } = message
        
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if (!role) {
            message.channel.send(`:x: (S1-SD5:204373) There is no role with the name '${roleName}'`)
            return
        }

        const member = guild.members.cache.get(targetUser.id)

        if (member.roles.cache.get(role.id)) {
            message.channel.send(`User has role '${roleName}': :white_check_mark: True`)
        } else {
            message.channel.send(`User has role '${roleName}': <:white_cross_mark:796721411037069322> False`)
        }
    }
}