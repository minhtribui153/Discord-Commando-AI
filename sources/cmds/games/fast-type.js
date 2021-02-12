const Commando = require('discord.js-commando')
const { words } = require('@system/games/Fast Type/fast-type-words.json')
const game_norm = require('@system/games/Fast Type/fast-type.json')
const { game_time, game_countdown, point } = game_norm

const example = {
  channelId: {
    message: 'message object',
    stage: 'string',
    counter: 'number',
    currentWord: 'string',
    remainingWords: ['words here'],
    points: {
      userId: 'points',
    },
  },
}

const games = {}

const stages = {
  STARTING: (counter) => {
    return `Game starting in ${counter} second(s)!`
  },
  IN_GAME: (word) => {
    let spacedWord = ''

    for (const character of [...word]) {
      spacedWord += character
      spacedWord += ' '
    }

    let the_message = `Type as fast as you can in ${game_time} seconds!\n\n`

    the_message += `The new word is **${spacedWord}**!`

    return the_message
  },
  ENDING: (points) => {
    const sorted = Object.keys(points).sort((a, b) => {
      return points[b] - points[a]
    })

    let results = ''

    for (const key of sorted) {
      const amount = points[key]
      results += `<@${key}> had ${amount} point${amount === point ? '' : 's'}\n`
    }

    return `Time's up! Here are the results:\n\n${results}------------------`
  },
}

const selectWord = (game) => {
  game.currentWord =
    game.remainingWords[Math.floor(Math.random() * game.remainingWords.length)]

  const index = game.remainingWords.indexOf(game.currentWord)
  game.remainingWords.splice(index, 1)
}

const gameLoop = () => {
  for (const key in games) {
    const game = games[key]
    const { message, stage } = game

    if (stage === 'STARTING') {
      let string = stages[stage](game.counter)
      message.edit(string)

      if (game.counter <= 0) {
        game.stage = 'IN_GAME'
        game.counter = game_time

        selectWord(game)

        string = stages[game.stage](game.currentWord)
        message.edit(string)
      }
    } else if (stage === 'IN_GAME') {
      if (game.counter <= 0) {
        game.stage = 'ENDING'

        const string = stages[game.stage](game.points)
        message.edit(string)

        // Delete the game
        delete games[key]

        continue
      }
    }

    --game.counter
  }

  setTimeout(gameLoop, 1000)
}

module.exports = class FastTypeGame extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'fasttype',
      group: 'games',
      memberName: 'fasttype',
      description: 'Starts a fast type game',
    })

    client.on('message', (message) => {
      const { channel, content, member } = message
      const { id } = channel

      const game = games[id]

      if (game && game.currentWord && !member.user.bot) {
        message.delete()

        if (
          game.stage === 'IN_GAME' &&
          content.toLowerCase() === game.currentWord.toLowerCase()
        ) {
          game.currentWord = null
          const seconds = 2

          const { points } = game
          points[member.id] = points[member.id] || 0

          message
            .reply(`You won! +1 point (Current score: ${++points[member.id]} total)`)
            .then((newMessage) => {
              newMessage.delete({
                timeout: 1000 * seconds,
              })
            })

          setTimeout(() => {
            if (game.stage === 'IN_GAME') {
              selectWord(game)

              const string = stages[game.stage](game.currentWord)
              game.message.edit(string)
            }
          }, 1000 * seconds)
        }
      }
    })

    gameLoop()
  }

  async run(message) {
    const { channel } = message

    message.delete()
    channel.send('Just a moment...').then((message) => {
      games[channel.id] = {
        message,
        stage: 'STARTING',
        counter: game_countdown,
        remainingWords: [...words],
        points: {},
      }
    })
  }
}
