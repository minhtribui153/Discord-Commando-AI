const Commando = require('discord.js-commando')
const muteSchema = require('../../schemas/mute-schema')

module.exports = class UnmuteCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            group: 'moderation',
            memberName: 'unmute',
            userPermissions: [
                'ADMINISTRATOR'
            ],
            format: '<user_mention/user_id>',
            description: 'Unmutes a user',
            argsType: 'multiple'
        })
    }

    run = async (message, args) => {
        const { guild } = message

        if (args.length !== 1) {
            message.reply(`Wrong Syntax! Use ${guild.commandPrefix}mute \`<user_mention/user_id>\``)
            return
        }

        let id = ''

        const target = message.mentions.users.first()
        if (target) {
            id = target.id
        } else {
            id = args[0]
        }

        const result = await muteSchema.updateOne({
            guildId: guild.id,
            userId: id,
            current: true
        }, {
            current: false
        })

        if (result.nModified === 1) {
            const mutedRole = guild.roles.cache.find(role => {
                return role.name === 'Temporarily Muted'
            })

            if (mutedRole) {
                const guildMember = guild.members.cache.get(id)
                guildMember.roles.remove(mutedRole)
            } else {
                message.reply('Please create a role "Temporarily Muted"!')
                return
            }
            message.reply(`You unmuted <@${id}>`)
        } else {
            message.reply('That user is not muted')
        }
    }
}