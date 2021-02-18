const Commando = require('discord.js-commando')
const languageSchema = require('@schemas/language-schema')
const { languages } = require('@system/data/language.json')
const { setLanguage } = require('@features/language')

module.exports = class SetlangCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setlanguage',
            group: 'languages',
            userPermissions: [
                'ADMINISTRATOR',
            ],
            memberName: 'setlanguage',
            format: '<language>',
            description: 'Sets a language'
        })
    }

    run = async (message, args) => {
        const { guild } = message

        const targetLanguage = args.toLowerCase()

        if (!languages.includes(targetLanguage)) {
            message.reply('That language is not supported!')
            return
        }

        setLanguage(guild, targetLanguage)

        await languageSchema.findOneAndUpdate({
            _id: guild.id,
        }, {
            _id: guild.id,
            language: targetLanguage,
        }, {
            upsert: true
        })

        message.reply('Language set!').then((messagef) => {
            const seconds = 3
            messagef.delete({
                timeout: 1000 * seconds
            })
        })
    }
}