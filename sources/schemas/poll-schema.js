const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const pollSchema = mongoose.Schema(
    {
        // Guild ID
        _id: reqString,
        channelId: reqString
    }
)

module.exports = mongoose.model('polling-channels', pollSchema)