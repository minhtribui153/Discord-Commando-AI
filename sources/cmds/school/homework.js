const Discord = require('discord.js')
const Commando = require('discord.js-commando')

const channelId = '796731027715915786'

module.exports = class HomeworkCommand extends Commando.Command{
    constructor(client) {
        super(client, {
            name: 'homework',
            group: 'school',
            memberName: 'homework',
            format: '<subject> <>',
            argsType: 'multiple',
            description: 'Creates a homework for the class. (Note: Write a homework once)'
        })
    }

    run = async (message, args) => {
        let subject = args
        args.shift()
        const homework = args

        const embed = new Discord.MessageEmbed()
            .setColor('#FC0303')
            .setAuthor(`New homework from ${message.author.username}`, 'https://cdn.discordapp.com/attachments/775954230032465930/796734171053293639/School_Logo.jpg')
            .addFields(
                {
                    name: 'To do:',
                    value: homework,
                },

                {
                    name: 'Submission:',
                    value: 'Click the ✅ button if you are done with your homework\nIf you need help, react with ❓.',
                }
            )
        const { guild } = message
        const channel = guild.channels.cache.get(channelId)
        channel.send(embed).then((messagereact) => {
            messagereact.react('✅')
            messagereact.react('❓')
        })
    }
}