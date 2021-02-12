const Commando = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

const amongUsCategorySchema = require('@schemas/among-us-category-schema')

const channelNameStart = 'Among Us'

const { regions, options } = require('@system/games/Among Us/among-us.json')

module.exports = class AmongUsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'among-us',
            group: 'games',
            memberName: 'among-us',
            format: '<region> <code> <status>',
            description: 'Makes it easier to play "Among Us" with friends',
            argsType: 'multiple'
        })

        client.on('voiceStateUpdate', oldState => {
            const { channel } = oldState

            if (channel && channel.name.startsWith(channelNameStart) && channel.members.size === 0) {
                channel.delete()
            }
        })
    }

    run = async (message, args) => {
        const [reg, co, opt] = args
        if (!opt) return
        
        const region = reg.toUpperCase()

        
        if (!region) {
            message.reply('Please specify a region')
            return
        }

        const newRegion = regions[region]
        if (!newRegion) {
            message.reply(`Incorrect Region Code.\nPlease choose one of the following:\n\`${Object.keys(regions)}\``)
            return
        }

        

        const code = co.toUpperCase()


        if (!code) {
            message.reply('Please specify the game code')
            return
        }

        const { channel, guild, member } = message

        const categoryDocument = await amongUsCategorySchema.findOne({
            _id: guild.id
        })

        if (!categoryDocument) {
            message.reply('Please set a category called "Among Us" in this server')
            return
        }

        const channelName = `${channelNameStart} "${code}"`
        await guild.channels.create(channelName, {
            type: 'voice',
            userLimit: 10,
            parent: categoryDocument.categoryId
        })
        
        const option = opt.toUpperCase()

        const embed = new MessageEmbed()
            .setAuthor(
                member.nickname || member.displayName,
                member.user.displayAvatarURL()
            )
            .setColor('#FF1100')
            .setTitle(`❗ New Among Us Game!`)
            .setDescription(
                `Open the Among Us App and enter code "${code}" Now!`
            )
            .setThumbnail('https://cdn.discordapp.com/attachments/775954230032465930/807587646322638858/latest.png')
            .addField('Region', newRegion)
            .addField('Status', `${options[option] ? `${options[option]}` : '❓ Not Specified'}`)
            .setFooter(`Once you are done, enter the voice channel ${channelName}`)
        
        channel.send(embed)
    }
}