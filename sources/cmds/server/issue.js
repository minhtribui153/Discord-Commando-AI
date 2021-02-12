const Commando = require('discord.js-commando')

const channelId = '797029986380939265'
const check = '✅'
let registered = false

const registerEvent = client => {
    if (registered) {
        return
    }

    registered = true

    console.log('INFO: Registering Events')

    client.on('messageReactionAdd', (reaction, user) => {
        if (user.bot) {
            return
        }
        const { message } = reaction
        if (message.channel.id === channelId) {
            console.log('INFO: An issue has resolved')
            message.delete()
        }
    })
}

module.exports = class IssueCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'issue',
            group: 'server',
            format: '<issue_name>',
            memberName: 'issue',
            description: 'Creates an issue',
            clientPermissions: [
                'ADMINISTRATOR'
            ],
            userPermissions: [
                'ADMINISTRATOR'
            ]
        })

        registerEvent(client)
    }

    async run(message, args) {
        const { guild, member } = message

        const channel = guild.channels.cache.get(channelId)
        console.log('INFO: An issue has raised')
        channel.send(
            {embed: {
                "author": {
                  "name": `An issue was raised. Help answer the author through DM.`,
                  "icon_url": "https://cdn.discordapp.com/attachments/775954230032465930/796734171053293639/School_Logo.jpg"
                },
                "color": 53380,
                "footer": {
                  "text": `Click the ${check} icon when this issue has been resolved.`
                },
                "fields": [
                  {
                    "name": "Issue Raised by:",
                    "value": `<@${member.id}>`,
                    "inline": false
                  },
                  {
                    "name": "Issue:",
                    "value": `${args}`,
                    "inline": false
                  }
                ]
            }

        }).then((ticketMessage) => {
            ticketMessage.react(check)

            message.channel.send('✅ Your issue has been opened! Expect a reply within 24 hours.')
        })
    }
}