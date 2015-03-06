var mongoose = require('mongoose');

var PartySchema = new mongoose.Schema({
  name: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Party', PartySchema);