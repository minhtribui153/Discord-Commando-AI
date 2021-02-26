// Imports
require('module-alias/register')

const { MongoClient } = require('mongodb')
const { MongoDBProvider } = require('commando-provider-mongo')

const Commando = require('discord.js-commando')
const path = require('path')
const Time = new Date(0)
const config = require('./config.json')
const loadCommands = require('@commands/load-commands')
const mongo = require('@commands/mongo')
const TicTacToe = require('discord-tictactoe')
const interactions = require('discord-slash-commands-client')
const passport = require('passport')
const passportDiscord = require('passport-discord')
const ejs = require('ejs')
const session = require('express-session')
const MemoryStore = require("memorystore")


// Create WebServer Dashboard
const express = require("express")
const url = require('url')

const app = express()
app.listen(config.webserver_port, null, null, () => console.log(`[WEBSERVER] Webserver is up and running on port ${config.webserver_port}!`))

const filesDirectory = path.resolve(`${process.cwd()}${path.sep}dashboard`)
const templatesDirectory = path.resolve(`${filesDirectory}${path.sep}templates`)

const Strategy = passportDiscord.Strategy

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})

const strategy = new Strategy({
    clientID: config.clientId,
    clientSecret: config.clientSecret,
    callbackURL: `http://${config.serverIP}:${config.webserver_port}/callback`,
    scope: ["identify", "guilds"],
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile))
})

passport.use(strategy)

app.use(passport.initialize())
app.use(passport.session())

app.engine("html", ejs.renderFile)
app.set("view engine", "html")

var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))

const mStore = MemoryStore(session)

    // Configuration
    app.use(session({
        store: new mStore({ checkPeriod: 86400000 }),
        secret: "1u8cy0wgSOWb88qCgET8rk8RHrx4zhJ1COHqsiXCxJreKiEWEgUcnjeIzuNCzX5BuwzhXGTTOaWz9atoCciAwfps8kXmlrVyWTc3",
        resave: false,
        saveUninitialized: false,
    }))

    // Create Routes
    app.get("/login", (req, res, next) => {
        if (req.session.backURL) { // We check if there a return URL has been set prior redirecting/accesing.
        /* Return URL is the url that user will be redirected to after login. */
            req.session.backURL = req.session.backURL
        } else { // If there is no return URL we simply set it to index page.
            req.session.backURL = "/"
        }
        // Now that we have configured the returning URL, we can let passport redirect user to appropriate auth page.
        next()
    }, passport.authenticate("discord"))

    app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => { // Passport collects data that discord has returned and if user aborted auhorization it redirects to '/'
        session.us = req.user
        if (req.session.backURL) { // If there is a returning url we redirect user to it.
            const url = req.session.backURL
            req.session.backURL = null // We change returning url to null for little more performance.
            res.redirect(url)
        } else { // If there still isn't we won't leave user alone and stuck so well redirect it to index page.
            res.redirect("/")
        }
    })

    // Functions
    const authenticate = (req, res, next) => {
        if (req.isAuthenticated()) return next(); // If the user is logged in, we skip execution of the rest of the code in this function and let the code for te route run.
        req.session.backURL = req.url; // If execution reached this point, means that user is not logged in and we can set the return url to the current url.
        res.redirect("/login"); // And we redirect it to our login handler that will do the job.
    }

    const render = (req, res, template, data = {}) => {
        const baseData = {
            bot: client, // Your discord client.
            path: req.path, // Current path of the url
            user: req.isAuthenticated() ? req.user : null // If user is authenticated, we pass user, otherwise null.
        }
        
        const mergedData = Object.assign(baseData, data) // We merge the base data with data provided to function.
        const templatePath = path.resolve(`${templateDirectory}${path.sep}${template}`) // We resolve the template.
        
        res.render(templatePath, mergedData) // We render the template.
    }

    // Set up Assets Folder
    app.use("/assets", express.static(path.resolve(`${filesDirectory}${path.sep}assets`)))

    // First Route
    app.get("/", (req, res) => {
        renderTemplate(
           res, 
           req,
           "index.ejs"
        )
    })

// Create Tic Tac Toe Command
const bot = new TicTacToe({
    clientId: config.clientId,
    token: config.token,
    language: config.language,
    command: 'Tic-Tac-Toe'
})

bot.connect().then(console.log('[SUCCESS] Created Tic Tac Toe Command!')).catch(() => console.error("[ERROR] Cannot connect TicTacToe bot"));

// Features
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
const modLogs = require('@features/mod-logs')
const loadLanguages = require('@features/language').loadLanguages
const loadFeatures = require('./features/load-features')

// Create Commando Bot
const client = new Commando.CommandoClient({
    owner: config.ownerId,
    commandPrefix: prefix
})

client.setMaxListeners(100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000)

client.setProvider(
    MongoClient.connect(config.mongoPath, {
        useUnifiedTopology: true,
      })
        .then((client) => {
            return new MongoDBProvider(client, config.database)
        }).catch((err) => {
            console.error(err)
        })
)

// Events
client.on('ready', async () => {

// Start MongoDB connection
    try {
        await mongo().then(console.log(`[MONGODB] Connected to MongoDB server ${config.mongoPath}!`))
    } catch(e) {
        console.log(`[WARNING] ${e}`)
    }
    
// When Discord Bot is ready, do something
    console.log("[SUCCESS] Bot is ready.")


// Register Commands
    client.registry
        .registerGroups([
            ['school', 'School Matters'],
            ['math', 'Mathematics Calculation'],
            ['moderation', 'Moderator'],
            ['evaluation', 'Evaluation'],
            ['channels', 'Set Channels'],
            ['polling', 'Polling'],
            ['giveaway', 'Bot Giveaway'],
            ['games', 'Game Content'],
            ['role', 'Manage Roles'],
            ['server', 'Server Commands'],
            ['settings', 'System Settings'],
            ['outside', 'Happening Outside'],
            ['documentation', 'Discord.JS Documentation'],
            ['suggestions', 'Suggestions'],
            ['thanks', 'Thanks people'],
            ['languages', 'Language Selector']
        ])
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, 'cmds'))

// Features
    try {
        // Load Features
        loadFeatures(client)

        // Load Languages
        loadLanguages(client)
    } catch(e) {
        console.log(`[ERROR] ${e}`)
    }
})
client.login(config.token)