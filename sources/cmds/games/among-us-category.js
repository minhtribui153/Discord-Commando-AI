const Commando = require('discord.js-commando')
const language = require('../../features/features/language')
const amongUsCategorySchema = require('@schemas/among-us-category-schema')

module.exports = class AmongUsCategoryCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'among-us-cat',
            group: 'games',
            memberName: 'among-us-cat',
            userPermissions: [
                'ADMINISTRATOR'
            ],
            description:
                'Specifies the category to create Among Us voice channels in',
        })
    }

    run = async (message, args) => {
        const { guild } = message
        const categoryId = args
        if (!categoryId) {
            message.reply(`${language(guild, 'AMONG_US_ERR_1')}`)
            return
        }

        const category = message.guild.channels.cache.get(categoryId)

        if (!category.name === 'Among Us') {
            message.reply(`${language(guild, 'AMONG_US_ERR_2')} "${category}", ${language(guild, 'AMONG_US_ERR_3')}`)
            return
        }

        const guildId = message.guild.id

        await amongUsCategorySchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                _id: guildId,
                categoryId,
            },
            {
                upsert: true,
            }
        )

        message.reply(`${language(guild, 'AMONG_US_CAT_SET')}`)
      }
}