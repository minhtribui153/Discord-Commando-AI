// S1-SD5 Central

// Imports
require('module-alias/register')

// const Discord = require('discord.js')
// const client = new Discord.Client()
const { MongoClient } = require('mongodb')
const { MongoDBProvider } = require('commando-provider-mongo')

const Commando = require('discord.js-commando')
const path = require('path')
const Time = new Date(0)
const config = require('@root/config.json')
const loadCommands = require('@commands/load-commands')
const mongo = require('@commands/mongo')

const TicTacToe = require('discord-tictactoe')
const interactions = require('discord-slash-commands-client')

const bot = new TicTacToe({
    clientId: config.clientId,
    token: config.token,
    language: 'en',
    command: 'Tic-Tac-Toe'
})

bot.connect().then(console.log('INFO: Created Tic Tac Toe Command!')).catch(() => console.error("Cannot connect TicTacToe bot"));

// Modules
const prefix = config.prefix
const inviteNotify = require('@features/invite-notification')
const Polls = require('@features/poll')
const antiAd = require('@features/anti-ad')
const vulgarities = require('@features/anti-swear')
const advancedPolls = require('@features/advanced-poll')
const advancedSuggestions = require('@features/advanced-suggestions')
const msgs = require('@features/msgs')
const thanksLeaderboard = require('@features/thanks-leaderboard')
const mute = require('@features/mute')

const client = new Commando.CommandoClient({
    owner: '710319131983085599',
    commandPrefix: prefix
})

client.setProvider(
    MongoClient.connect(config.mongoPath, {
        useUnifiedTopology: true,
      })
        .then((client) => {
            return new MongoDBProvider(client, 'S1-SD5-Central')
        }).catch((err) => {
            console.error(err)
        })
)

// Events
client.on('ready', async () => {

    await mongo()

    console.log("INFO: Bot is ready.")

    const something = client.registry
        .registerGroups([
            ['school', 'School'],
            ['math', 'Math'],
            ['moderation', 'Moderation'],
            ['evaluation', 'Evaluation'],
            ['channels', 'Channels'],
            ['giveaway', 'Giveaway'],
            ['games', 'Games'],
            ['role', 'Role'],
            ['server', 'Server'],
            ['settings', 'Settings'],
            ['outside', 'Happening Outside'],
            ['documentation', 'Discord.JS Documentation'],
            ['suggestions', 'Suggestions'],
            ['thanks', 'Thanks people']
        ])
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, 'cmds'))

    // Variables
    const guild = client.guilds.cache.get('795605968112058378')

    // Load all commands and features
    //console.log('<-----------|Commands|----------->')
    //loadCommands(client)
    //console.log('<-----------|Features|----------->')
    //loadFeatures(client)

    msgs(client)

    // Invite Notification
    inviteNotify(client)

    // Anti-Advertisement
    antiAd(client)

    // Stop Vulgarities
    vulgarities(client)

    // Polls & Advanced Polls (Choose one)
    advancedPolls(client)
    advancedSuggestions(client)
    Polls(client)
    thanksLeaderboard(client)
    mute(client)
})

client.on('message', message => {
    
})

client.login(config.token)