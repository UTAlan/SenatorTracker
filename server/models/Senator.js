var mongoose = require('mongoose');

var senatorSchema = new mongoose.Schema({
    name: {
        first: { type: String, trim: true },
        last: { type: String, trim: true }
    },
    party: { type: String, enum: ['D', 'R'] },
    state: { type: String, enum: ['AL', 'AZ', 'CA', 'IA', 'KY', 'MD', 'MI', 'NV', 'UT', 'VT'] },
    active: Boolean,
    senior: Boolean
});

module.exports = mongoose.model('Senator', senatorSchema);