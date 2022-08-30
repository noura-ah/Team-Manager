const PlayerController = require("../controllers/players.controller")

module.exports = app => {
    app.get("/api/players", PlayerController.findAllPlayers)
    app.get("/api/players/random", PlayerController.findRandom)
    app.get("/api/players/:id", PlayerController.findSinglePlayer);
    app.post("/api/players/new", PlayerController.createNewPlayer)
    app.put("/api/players/update/:id", PlayerController.updatePlayer)
    app.delete("/api/players/delete/:id", PlayerController.deletePlayer)
};