const mongoose = require('mongoose');

const PasteSchema = new mongoose.Schema({
    Paste:{
        type: String
    },
    ExpireTime:{
        type: Date
    },
    OneTimeView:{
        type: Boolean,
        default: false
    }
});
PasteSchema.index({ 'ExpireTime': 1 }, { expireAfterSeconds: 0 });
module.exports = Paste= mongoose.model('Pastes',PasteSchema);