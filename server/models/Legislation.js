var mongoose = require('mongoose');

var legislationSchema = new mongoose.Schema({
    abbr: String,
    name: String,
    title: String,
    description: String,
    status: String
});

module.exports = mongoose.model('Legislation', legislationSchema);