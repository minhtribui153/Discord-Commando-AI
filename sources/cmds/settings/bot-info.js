const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando')
const { version } = require('@package/package.json')

module.exports = class BotInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            group: 'settings',
            format: '<member>',
            memberName: 'botinfo',
            description: 'Displays Bot Information'
        })
    }

    async run(message) {

        const embed = new MessageEmbed()
            .setColor('#0033FF')
            .setAuthor(`Information for ${this.client.user.username} Bot`, this.client.user.displayAvatarURL)
            .addFields(
                {
                    name: 'Bot tag',
                    value: this.client.user.tag
                },

                {
                    name: 'Version',
                    value: version,
                },

                {
                    name: 'Intepreter',
                    value: 'Discord (Node.js)'
                },

                {
                    name: "Server's command prefix",
                    value: message.guild.commandPrefix,
                },

                {
                    name: 'Time since last restart',
                    value: `${process.uptime().toFixed(2)} seconds`
                })
        message.channel.send(embed)
    }
}