const Player = require("../models/players.model")

module.exports.findAllPlayers = (req, res) => {
    Player.find().sort('name')
        .then(allPlayers => res.json({ players: allPlayers }))
        .catch(err => res.json({ message: "something went wrong", error: err }))
}

module.exports.findSinglePlayer = (req, res) => {
    Player.findOne({ _id: req.params.id })
        .then(singlePlayer => res.json({ player: singlePlayer }))
        .catch(err => res.status(400).json(err))
}

module.exports.createNewPlayer = (req, res) => {
    Player.create(req.body)
        .then(newPlayer => res.json({ player: newPlayer }))
        .catch(err => res.status(400).json(err))
}

module.exports.updatePlayer = (req, res) => {
    Player.findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators:true})
        .then(updatedPlayer => res.json({ player: updatedPlayer }))
        .catch(err => res.status(400).json(err))
}

module.exports.deletePlayer = (req, res) => {
    Player.deleteOne({ _id: req.params.id })
        .then(deletedPlayer => res.json({ player: deletedPlayer }))
        .catch(err => res.json({ message: "something went wrong", error: err }))
}

module.exports.findRandom = (req, res) => {
    Player.countDocuments()
        .then(count => {
            var random = Math.floor(Math.random() * count)
            // skip() to skip docs equal to random number 
            // if random =1 , skip will skip first doc and find one will return second doc
            Player.findOne().skip(random)
                .then(randomPlayer => res.json({ player: randomPlayer }))
                .catch(err => res.json({ message: "something went wrong", error: err }))
        })
        .catch(err => res.json({ message: "something went wrong", error: err }))

}