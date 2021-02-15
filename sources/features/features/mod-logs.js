const { MessageEmbed } = require('discord.js')
const modLogsChannelSchema = require('@schemas/mod-logs-channel-schema')

let ModCache = {} // { guildId: channelId }

const fetchModLogChannels = async (guildId) => {
    let query = {}

    if (guildId) {
        query._id = guildId
    }

    const results = await modLogsChannelSchema.find(query)

    for (const result of results) {
        const { _id, channelId } = result
        ModCache[_id] = channelId
    }

}

module.exports = (client) => {
    fetchModLogChannels()

    client.on('messageDelete', async message => {
        const { guild, channel, content } = message

        if (!guild) return
        if (!content) return
        
        const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        })
        const deletionLog = fetchedLogs.entries.first()

        const { executor, target } = deletionLog

        const cachedChannelId = ModCache[guild.id]
        if (cachedChannelId && !executor.bot) {
            const embed = new MessageEmbed()
                .setAuthor(`Message deleted at #${channel.name}`, message.author.avatarURL())
                .setColor('#C22121')
                .addFields(
                    {
                        name: 'Message Content',
                        value: content
                    },
                    {
                        name: 'Deleted by',
                        value: executor.tag
                    },
                )
                .setTimestamp()
            
            const LogChannel = guild.channels.cache.get(cachedChannelId)
            LogChannel.send(embed)
        }

        
    })

    client.on('guildMemberRemove', async member => {
        const { guild } = member

        if (!guild) return

        const cachedChannelId = ModCache[guild.id]
        if (!cachedChannelId) return
        const embed = new MessageEmbed()
            .setAuthor('Member removed', member.user.displayAvatarURL())
            .setColor('#FF0000')
            .addFields(
                {
                    name: 'Member who left',
                    value: member.user.tag,
                },
            )
            .setTimestamp()

        const LogChannel = guild.channels.cache.get(cachedChannelId)
        LogChannel.send(embed)
    })
    

    client.on('guildMemberAdd', async member => {
        const { guild, user } = member

        if (!guild) return

        const cachedChannelId = ModCache[guild.id]
        if (cachedChannelId) {
            const embed = new MessageEmbed()
                .setAuthor('Member added', member.user.displayAvatarURL())
                .setColor('#50C878')
                .addFields(
                    {
                        name: 'Member who joined',
                        value: member.user.tag,
                    },
                    {
                        name: 'Account Creation',
                        value: new Date(user.createdTimestamp).toLocaleDateString(),
                    },
                )
                .setTimestamp()

            const LogChannel = guild.channels.cache.get(cachedChannelId)
            LogChannel.send(embed)
        }
    })

    client.on('channelCreate', async channel => {
        const { guild } = channel
        if (!guild) return
        
        const cachedChannelId = ModCache[guild.id]
        if (cachedChannelId) {
            const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_CREATE"})
            const LogChannel = client.channels.cache.get(cachedChannelId)

            if (!LogChannel) return
            if (!AuditLogFetch.entries.first()) return

            const Entry = AuditLogFetch.entries.first()

            const embed = new MessageEmbed()
                .setAuthor('New Channel Created', Entry.executor.displayAvatarURL())
                .setColor('#009975')
                .setDescription(`A new Channel was created by ${Entry.executor.tag || "someone"}.`)
                .addFields(
                    {
                        name: 'Channel ID',
                        value: channel.id,
                    },
                    {
                        name: 'Channel Type',
                        value: channel.type
                    },
                    {
                        name: 'Created at',
                        value: new Date(channel.createdAt),
                    },
                )
                .setTimestamp()

            LogChannel.send(embed)
        }
    })

    client.on('channelUpdate', async (oldChannel, newChannel) => {
        const oldCategory = oldChannel.parent
        const newCategory = newChannel.parent
        const { guild } = newChannel
        if (!newCategory) newCategory = 'None'
        if (!guild || !guild.available) return
    
        let types = {
            text: 'Text Channel',
            voice: 'Voice Channel',
            null: 'None',
        }
        const cachedChannelId = ModCache[guild.id]
        const LogChannel = newChannel.guild.channels.cache.get(cachedChannelId)
        if (oldChannel.name !== newChannel.name && LogChannel) {
            const embed = new MessageEmbed()
                .setColor('#E7CE12')
                .setAuthor('Channel Updated')
                .setDescription(`#${oldChannel.name} --> #${newChannel.name}`)
                .setTimestamp()
            LogChannel.send(embed)
        }
    })
}

module.exports.fetchModLogChannels = fetchModLogChannels

module.exports.ModCache = () => {
    return ModCache
}