const Commando = require('discord.js-commando')

module.exports = class KickCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'removerole',
            group: 'role',
            format: '<member> <role>',
            memberName: 'removerole',
            argsType: 'multiple',
            description: 'Removes a user\'s role (Only if have)',
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
            message.channel.send(':x: (S1-SD5:204365) Please specify someone to give a role to.')
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
            member.roles.remove(role)
            message.channel.send(`:white_check_mark: That user no longer has the '${roleName}' role now!`)
        } else {
            message.channel.send(`:x: (S1-SD5:204387) That user does not have the ${roleName}`)
        }
    }
}