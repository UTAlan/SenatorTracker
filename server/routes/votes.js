var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Vote     = require('../models/Vote.js');

// GET /api/votes listing
router.get('/', function(req, res, next) {
    Vote.find(function (err, votes) {
        if (err) return next(err);
        
        res.json(votes);
    });
});

// POST /api/votes
router.post('/', function(req, res, next) {
    Vote.create(req.body, function (err, votes) {
        if (err) return next(err);
        res.json(votes);
    });
});

// GET /api/votes/id
router.get('/:id', function(req, res, next) {
    Vote.findById(req.params.id, function (err, votes) {
        if (err) return next(err);
        res.json(votes);
    });
});

// GET /api/votes/legislation/id
router.get('/legislation/:id', function(req, res, next) {
    var query = { legislation_id: new ObjectId(req.params.id.toString()) };
    Vote.find(query, function (err, votes) {
        if (err) return next(err);
        res.json(votes);
    });
});

// PUT /api/votes/:id
router.put('/:id', function(req, res, next) {
    Vote.findByIdAndUpdate(req.params.id, req.body, function (err, votes) {
        if (err) return next(err);
        res.json(votes);
    });
});

// DELETE /api/votes/:id
router.delete('/:id', function(req, res, next) {
    Vote.findByIdAndRemove(req.params.id, req.body, function (err, votes) {
        if (err) return next(err);
        res.json(votes);
    });
});

module.exports = router;