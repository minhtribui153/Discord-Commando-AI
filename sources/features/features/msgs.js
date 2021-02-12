module.exports = client => {
    client.on('message', message => {
        const msg = message.content.toLowerCase()
        if (msg === 'thx' || msg === 'thanks' || msg === 'thank you') {
            message.channel.send(`**TIP:** Want to thank someone? Use \`${message.guild.commandPrefix}thank <Their @>\``)
        }
    })
}