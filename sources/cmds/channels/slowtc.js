const Commando = require('discord.js-commando')
const language = require('@features/language')

module.exports = class SlowCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'slowtc',
            group: 'channels',
            memberName: 'slowtc',
            userPermissions: ['ADMINISTRATOR'],
            description: 'Changes the slowmode duration for this channel',
            argsType: 'multiple',
        })
    }

    run = (message, args) => {
        const { channel, guild } = message

        if (args.length < 2) {
            message.reply(`${language(guild, 'DURATION_REASON_ERROR')}`)
            return
        }

        let duration = args.shift().toLowerCase()
        if (duration === 'off') {
            duration = 0
        }

        if (isNaN(duration)) {
            message.reply(
                `${language(guild, 'SECONDS_OFF_ERROR')} "off"`
            )
            return
        }

    //['testing','hello','world']
    //.join(' ')
    //testing hello world

    channel.setRateLimitPerUser(duration, args.join(' '))
    message.reply(`${language(guild, 'SLOWMODE_SET_TO')} ${duration}`)
  }
}