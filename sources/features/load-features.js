const path = require('path')
const fs = require('fs')

const data = []

module.exports = (client) => {
  console.log('[FEATURES] Features logged')
  let counter = 1
  let data = {}

  const readFeatures = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readFeatures(path.join(dir, file))
      } else if (file !== 'load-features.js' && file !== 'first-message.js' && file !== 'message.js' && file !== 'private-message.js' && file !== 'languages.js') {
        try {
            const feature = require(path.join(__dirname, dir, file))
            feature(client)
            data[counter] = {feature: file, status: '✅'}
        } catch(e) {
            data[counter] = {feature: file, status: '❌'}
        }
        
        counter += 1
      }
    }
  }

  readFeatures('.')
  counter = 1
  console.table(data)
}