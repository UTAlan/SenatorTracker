var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Senator = require('../models/Senator.js');

// GET /api/senators listing
router.get('/', function(req, res, next) {
    Senator.find(function (err, senators) {
        if (err) return next(err);
        res.json(senators);
    });
});

// POST /api/senators
router.post('/', function(req, res, next) {
    Senator.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// GET /api/senators/id
router.get('/:id', function(req, res, next) {
    Senator.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// PUT /api/senators/:id
router.put('/:id', function(req, res, next) {
    Senator.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// DELETE /api/senators/:id
router.delete('/:id', function(req, res, next) {
    Senator.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;