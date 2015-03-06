var mongoose = require('mongoose');

var senatorSchema = new mongoose.Schema({
  name: {
    first: { type: String, trim: true },
    last: { type: String, trim: true }
  },
  party: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
  state: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
  senior: Boolean,
  active: Boolean,
  birthdate: Date,
  current_term_start_date: Date
});

module.exports = mongoose.model('Senator', senatorSchema);