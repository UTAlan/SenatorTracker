var express     = require('express');
var router      = express.Router();
var mongoose    = require('mongoose');
var ObjectId    = mongoose.Types.ObjectId;
var Legislation = require('../models/Legislation.js');
var Vote        = require('../models/Vote.js');
var Senator     = require('../models/Senator.js');

// GET /api/legislations listing
router.get('/', function(req, res, next) {
    result = {};
    Legislation.find(function (err, legislations) {
        if (err) return next(err);
        result["legislations"] = legislations;
        
        result["votes"] = [];
        legislations.forEach(function(legislation, l_index, array) {
            Vote.find({ legislation_id: new ObjectId(legislation["_id"]) }, function (err, votes) {
                if (err) return next(err);
                result["votes"][l_index] = votes;

                result["senators"] = [];
                votes.forEach(function(vote, v_index, arr) {
                    result["senators"][l_index] = [];
                    Senator.findById(vote["senator_id"], function(err, senator) {
                        if (err) return next(err);
                        result["senators"][l_index][v_index] = senator;
                        res.json(result);
                    });
                });
            });
        });
    });
});

// POST /api/legislations
router.post('/', function(req, res, next) {
    Legislation.create(req.body, function (err, legislations) {
        if (err) return next(err);
        res.json(legislations);
    });
});

// GET /api/legislations/id
router.get('/:id', function(req, res, next) {
    result = {};
    Legislation.findById(req.params.id, function (err, legislations) {
        if (err) return next(err);
        result["legislation"] = legislations

        Vote.find({ legislation_id: new ObjectId(req.params.id) }, function (err, votes) {
            if (err) return next(err);
            result["votes"] = votes;

            result["senators"] = [];
            votes.forEach(function(vote, index, array) {
                Senator.findById(vote["senator_id"], function(err, senator) {
                    if (err) return next(err);
                    result["senators"][index] = senator;
                    res.json(result);
                });
            });
        });
    });
});

// PUT /api/legislations/:id
router.put('/:id', function(req, res, next) {
    Legislation.findByIdAndUpdate(req.params.id, req.body, function (err, legislations) {
        if (err) return next(err);
        res.json(legislations);
    });
});

// DELETE /api/legislations/:id
router.delete('/:id', function(req, res, next) {
    Legislation.findByIdAndRemove(req.params.id, req.body, function (err, legislations) {
        if (err) return next(err);
        res.json(legislations);
    });
});

module.exports = router;