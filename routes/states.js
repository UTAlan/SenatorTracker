var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var State = require('../models/State.js');

// GET /api/states listing
router.get('/', function(req, res, next) {
    State.find(function (err, states) {
        if (err) return next(err);
        res.json(states);
    });
});

// POST /api/states
router.post('/', function(req, res, next) {
    State.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// GET /api/states/id
router.get('/:id', function(req, res, next) {
    State.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// PUT /api/states/:id
router.put('/:id', function(req, res, next) {
    State.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// DELETE /api/states/:id
router.delete('/:id', function(req, res, next) {
    State.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;