const Commando = require('discord.js-commando')
const { client } = require('@commands/command-base')

module.exports = class ServersCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'servers',
            group: 'server',
            memberName: 'servers',
            description: 'Show amount of members in this server.',
        })
    }

    async run(message) {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`)
        })
    }
}