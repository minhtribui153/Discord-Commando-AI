const Commando = require('discord.js-commando')
const tempChannelSchema = require('@schemas/temp-channels-schema')

module.exports = class TempChannelCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'tempchannel',
            group: 'channels',
            memberName: 'tempchannel',
            userPermissions: [
                'ADMINISTRATOR'
            ],
            description: 'Creates a temporary channel',
            format: '<category_id> <expires:Minutes>',
            argsType: 'multiple',
            examples: ['tempchannel 245943572345 3'],
        })
    }

    run = async (message) => {
        const { guild, member } = message
        const guildId = guild.id
        const memberId = member.id

        const categoryId = args.shift()
        const expire = args.shift()
    
        const results = await tempChannelSchema.findOne({
            guildId,
            memberId,
        })
    
        if (results) {
            message.reply('You already have a temporary channel')
            return
        }
    
        message.reply('You have been tagged in a channel, please check it.')
    
        const role = guild.roles.cache.find((role) => {
            return role.name === '@everyone'
        })
    
        const newChannel = await guild.channels.create('Test Temp Channel', {
            parent: categoryId, // Community category
            permissionOverwrites: [
                {
                    id: role.id, // Everyone role
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: memberId,
                    allow: ['VIEW_CHANNEL'],
                },
            ],
        })
    
        newChannel.send(`This channel is a temporary channel.\nIt will be deleted in ${expire} minute(s)`)
    
        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + expire)
    
        await new tempChannelSchema({
            guildId,
            channelId: newChannel.id,
            userId: memberId,
            expires,
        }).save()
    }
}