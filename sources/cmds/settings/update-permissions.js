const Commando = require('discord.js-commando')
const validPermissions = require('@commands/permissions')
const permissions = require('../../utilities/permissions')
const name = 'updatepermissions'

module.exports = class UpdatePermissionsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: name,
            group: 'settings',
            format: '<channel_id> <role_id> <"add" or "remove"> <Any amount of permission nodes>',
            memberName: name,
            description: 'Updates a channel\'s permissions',
            userPermissions: [
                'ADMINISTRATOR'
            ],
            argsType: 'multiple',
        })
    }

    async run(message, args) {

        const { guild } = message

        if (args.length < 4) {
            message.channel.send(`:x: (S1-SD5:278395) ${message.author}, You must provide a channel ID, role ID, an action, and some permission nodes.
Syntax example:
${guild.commandPrefix}${name} <channel_id> <role_id> <"add" or "remove"> <Any amount of permission nodes>

A list of permission nodes can be found here: <https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS>`)
            return
        }

        // Get channel ID and remove it from array
        const channelId = args.shift()
        const channel = guild.channels.cache.get(channelId)
        if (!channel) {
            message.channel.send(`:x: (S1-SD5:2723533) ${message.author}, unknown channel.`)
            return
        }

        // Get role ID and remove it from array
        const roleId = args.shift()
        const role = guild.roles.cache.get(roleId)
        if (!role) {
            message.channel.send(`:x: (S1-SD5:2723534) ${message.author}, unknown role.`)
            return
        }

        // Get action and make sure it is either "add" or "remove"
        const action = args.shift().toLowerCase()
        if (action !== 'add' && action !== 'remove') {
            message.channel.send(`:x: (S1-SD5:2723535) ${message.author}, please provide either "add" or "remove".`)
            return
        }

        args = args.join(' ').toUpperCase().split(' ')

        // Check if all permission nodes are valid
        for (const arg of args) {
            if (!permissions.includes(arg)) {
                let allPerms = ''
                for (const perm of permissions) {
                    allPerms += `${perm}, `
                }
                allPerms = allPerms.substr(0, allPerms.length - 2)

                const errorMessage = `Unknown permission node "${arg}". Please specify one of the following:
${allPerms}`    
                message.reply(errorMessage)
                return
            }
        }

        

        // Update channel permissions specified
        channel.overwritePermissions([
            {
                id: roleId,
                allow: action === 'add' ? args : [],
                deny: action === 'remove' ? args : []
            }
        ])

        message.reply('Channel permissions updated!')
    }
}