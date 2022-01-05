const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PasteSchema = new Schema({
    PasteMsg :{
        type:   String
    },
    ExpireTime:{
        type: Date
    },
})
PasteSchema.index({ 'ExpireTime': 1 }, { expireAfterSeconds: 0 });
const Paste = mongoose.model('Pastes',PasteSchema)
module.exports = Paste
