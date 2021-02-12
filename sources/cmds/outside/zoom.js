const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando')

module.exports = class ZoomCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'zoom',
            group: 'outside',
            memberName: 'zoom',
            format: '<meeting_id> <password>',
            description: 'Hosts a Zoom Meeting',
            argsType: 'multiple'
        })
    }

    run = async (message, args) => {
        const [meeting_id, password] = args
        if (!meeting_id || !password) {
            message.reply(`Wrong Syntax! Correct Syntax: ${message.guild.commandPrefix}zoom \`<meeting_id> <password>\``)
            return
        }
        const url = `https://zoom.us/j/${meeting_id}`

        const embed = new MessageEmbed()
            .setAuthor('New Zoom Meeting', message.author.avatarURL())
            .setTitle(`${message.author.tag} has created a Zoom Meeting!`)
            .setThumbnail('https://cdn.discordapp.com/attachments/775954230032465930/809307360572473364/2020_4largeimg_1524497950.png')
            .addFields(
                {
                    name: 'Meeting ID',
                    value: meeting_id,
                },
                {
                    name: 'Password',
                    value: password,
                },
                {
                    name: 'Join by URL',
                    value: url,
                }
            )
            .setColor('#0373FC')
        
        message.channel.send(embed)
    }
}