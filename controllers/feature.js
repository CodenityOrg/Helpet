"use strict";
const Feature = require("../model/Feature");

module.exports = {
    getForQuery(req,res) {
        const q = req.query.q;
        Feature.find({ name: new RegExp(q, "i") })
            .then(features => res.send(JSON.stringify(features), 200))
            .catch((err) => res.send(null,503));
    }
}