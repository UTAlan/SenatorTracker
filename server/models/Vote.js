var mongoose = require('mongoose');

var voteSchema = new mongoose.Schema({
    value: { type: String, enum: ['Yea', 'Nay', 'Not Voting'] },
    legislation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Legislation' },
    senator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Senator' }
});

module.exports = mongoose.model('Vote', voteSchema);