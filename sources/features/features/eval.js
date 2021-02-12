const command = require('@features/command')
const config = require('@root/config.json')

const ownerId = '710319131983085599'
const channelId = '795643977428631613'

module.exports = client => {
    command(client, 'eval', message => {
        const { member, channel, content } = message

        if (member.id === ownerId && channel.id === channelId) {
            const result = eval(content.replace(`${config.prefix}eval`, ''))
            channel.send(':white_check_mark:\n```' + `${result}` + '```').catch((err) => {
                channel.send(':x:\n```' + `${err}` + '```')
            })
        } else {
            message.channel.send(':x: Access Denied. You must be an owner to use this command >:( .')
        }
    })
}