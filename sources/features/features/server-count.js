module.exports = client => {
    console.log('[SERVER] Retrieving servers')
    let data = {}

    let counter = 1
    for (const guild of client.guilds.cache) {
        const guildId = guild[0]

        const { name, memberCount, owner } = client.guilds.cache.get(guildId)
        data[counter] = {server: name, owner: owner.user.tag, status: 'Online'}

        counter += 1
    }
    counter = 1

    console.table(data)

}