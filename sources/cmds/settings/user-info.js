const Commando = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class UserInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            group: 'settings',
            memberName: 'userinfo',
            description: 'Displays information about a user/author'
        })
    }

    async run(message) {
        const { guild, channel } = message

        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)

        const embed = new MessageEmbed()
            .setColor('#FF7400')
            .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
            .addFields(
                {
                    name: 'User tag',
                    value: user.tag,
                },

                {
                    name: 'This member is a bot',
                    value: user.bot,
                },

                {
                    name: 'User ID',
                    value: user.id,
                },

                {
                    name: 'Nickname',
                    value: member.nickname || 'None',
                },

                {
                    name: 'Joined at',
                    value: new Date(member.joinedTimestamp).toLocaleDateString(),
                },

                {
                    name: 'Account created at',
                    value: new Date(user.createdTimestamp).toLocaleDateString(),
                },

                {
                    name: 'Role count',
                    value: member.roles.cache.size - 1,
                }
            )
        channel.send(embed)
    }
}