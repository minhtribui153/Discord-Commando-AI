const Commando = require('discord.js-commando')
const thanksLeaderboardSchema = require('@schemas/thanks-leaderboard-schema')

module.exports = class SetLeaderboardCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setleaderboard',
            group: 'thanks',
            memberName: 'setleaderboard',
            userPermissions: [
                'ADMINISTRATOR'
            ],
            description: 'Sets up a thanks leaderboard channel'
        })
    }

    run = async (message) => {
        const { guild, channel } = message
        const guildId = guild.id
        const channelId = channel.id

        await thanksLeaderboardSchema.findByIdAndUpdate({
            _id: guildId,
            channelId
        }, {
            _id: guildId,
            channelId
        }, {
            upsert: true
        })

        message.reply('Thanks leaderboard channel set!')
            .then((message) => {
                message.delete({
                    timeout: 1000 * 5
                })
            })
        message.delete()
    }
}