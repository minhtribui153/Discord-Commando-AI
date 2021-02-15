const Commando = require('discord.js-commando')

module.exports = class SubtractCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'subtract',
            group: 'math',
            memberName: 'subtract',
            description: 'Subtracts numbers together',
            format: '<numbers>',
            argsType: 'multiple',
        })
    }

    run = async (message, args) => {
        let subtraction = 0
        for (const arg of args) {
            subtraction -= parseInt(arg)
        }

        message.reply(`Subtraction of numbers is ${subtraction}`)
    }
}