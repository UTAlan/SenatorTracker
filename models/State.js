var mongoose = require('mongoose');

var StateSchema = new mongoose.Schema({
  name: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('State', StateSchema);