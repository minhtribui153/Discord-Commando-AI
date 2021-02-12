const Commando = require('discord.js-commando')
const translate = require('translate-google-api')

module.exports = class TranslateCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'translate',
            group: 'server',
            memberName: 'translate',
            format: '<language> <args>',
            description: 'Translates a sentence from a language to another language using Google Translate',
            argsType: 'multiple'
        })
    }

    run = async (message, args) => {
        const language = args.shift().toLowerCase()
        const the_arguments = args.join(' ')

        translate(String(the_arguments), {to: language}).then(res => {
            message.channel.send(res)
        }).catch(err => {
            message.reply(`Translator ran into a problem: \`${err}\``)
            return
        })
    }
}