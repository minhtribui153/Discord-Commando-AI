const languageSchema = require('@schemas/language-schema')
const lang = require('../../system/data/language.json')

const guildLanguages = {}

const loadLanguages = async (client) => {
    console.log('[LANGUAGE] Here are the languages on servers')
    let data = {}
    for (const guild of client.guilds.cache) {
        const guildId = guild[0]

        const name = client.guilds.cache.get(guildId)

        const result = await languageSchema.findOne({
            _id: guildId
        })

        data[name] = result ? result.language : 'english'
    }

    console.table(data)
}

const setLanguage = (guild, language) => {
    guildLanguages[guild.id] = language.toLowerCase()
}

module.exports = (guild, textId) => {
    if (!lang.translations[textId]) {
        throw new Error(`Unknown text ID "${textId}"`)
    }

    const selectedLanguage = (!guildLanguages[guild.id] === undefined) ? guildLanguages[guild.id].toLowerCase() : 'english'

    return lang.translations[textId][selectedLanguage]
}

module.exports.loadLanguages = loadLanguages
module.exports.setLanguage = setLanguage