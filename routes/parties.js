var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Party = require('../models/Party.js');

// GET /api/parties listing
router.get('/', function(req, res, next) {
    Party.find(function (err, parties) {
        if (err) return next(err);
        res.json(parties);
    });
});

// POST /api/parties
router.post('/', function(req, res, next) {
    Party.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// GET /api/parties/id
router.get('/:id', function(req, res, next) {
    Party.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// PUT /api/parties/:id
router.put('/:id', function(req, res, next) {
    Party.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// DELETE /api/parties/:id
router.delete('/:id', function(req, res, next) {
    Party.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;