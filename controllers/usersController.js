const db = require("../models/user.js");


module.exports = {
    findAll: function(req, res) {
      db.User
        .find(req.query)
        .sort({ isSignedIn: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
      db.User
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  };