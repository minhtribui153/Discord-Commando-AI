const Commando = require('discord.js-commando')
const language = require('@features/language')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'add',
            group: 'math',
            memberName: 'add',
            description: 'Adds numbers together',
            format: '<numbers>',
            argsType: 'multiple',
        })
    }

    async run(message, args) {
        const { guild } = message

        let sum = 0

        for (const arg of args) {
            sum += parseInt(arg)
        }

        message.reply(`${language(guild, 'THE_SUM_IS')} ${sum}`)
    }
}