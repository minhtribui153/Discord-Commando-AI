const Commando = require('discord.js-commando')

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
        const categoryId = args
        if (!categoryId) {
            message.reply('Please specify the "Among Us" category ID')
            return
        }

        const category = message.guild.channels.cache.get(categoryId)

        if (!category.name === 'Among Us') {
            message.reply(`That category name is "${category}", not "Among Us"!`)
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

        message.reply('Among Us category set!')
      }
}