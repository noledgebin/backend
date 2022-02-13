const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PasteSchema = new Schema({
    text :{
        type:   String
    },
    compressed:{
        type:Boolean
    },
    ExpireTime:{
        type: Date
    },
    BurnAfterRead:{
        type:Boolean
    },
    syntaxHl:{
        type: Boolean
    }
})
PasteSchema.index({ 'ExpireTime': 1 }, { expireAfterSeconds: 0 });
const Paste = mongoose.model('Pastes',PasteSchema)
module.exports = Paste
