import React from "react"
import axios from 'axios'

const PlayerStatus = () => {
    const [players, setPlayers] = React.useState([])

    //which game we are in, initialgame is game1 which is in games[0] 
    const [game, setGame] = React.useState(0)

    //update if Player Status is changed
    const [isPlayerStatusChanged, setIsPlayerStatusChanged] = React.useState(false)

    //All status to print colorful btns
    let statusOption = [
        { status: 'Undecided', color: 'yellow' },
        { status: 'Playing', color: 'green' },
        { status: 'Not Playing', color: 'red' }
    ]

    //get players - it will be updated everytime a player status changed
    React.useEffect(() => {
        axios.get(`http://localhost:8000/api/players`)
            .then(res => setPlayers(res.data.players))
            .catch(err => console.log(err))
        setIsPlayerStatusChanged(false)
    }, [isPlayerStatusChanged])

    //choose game 
    const handleClick = (e) => {
        setGame(e.target.value)
    }

    // update players action in particular game
    const handleAction = (e, player) => {
        player.games[game].status = e.target.value
        axios.put(`http://localhost:8000/api/players/update/${player._id}`, player)
            .then(setIsPlayerStatusChanged(true))
            .catch(err => console.log(err))
    }
    return (
        <div className="container p-5">
            <h3 className="d-flex mb-4">Player Status - <span className="mx-1"> Game {parseInt(game) + 1} </span></h3>
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-link" value={0} onClick={handleClick}>Game 1</button> <span> | </span>
                <button className="btn btn-link" value={1} onClick={handleClick}>Game 2</button> <span> | </span>
                <button className="btn btn-link" value={2} onClick={handleClick}>Game 3</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Player name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player =>
                        <tr key={player._id}>
                            <td>{player.name}</td>
                            <td>
                                {/* loop throw the list we created to show all three status,
                                 but give color to player status only */}
                                {statusOption.map((op, ind) =>
                                    // compare here to give the player status a color
                                    // if the status from our list == player status => give it a colored button
                                    player.games[game].status == op.status ?
                                        <button key={ind} className="btn mx-1" style={{ backgroundColor: op.color }} onClick={(e) => handleAction(e, player)} value={op.status}>{op.status}</button> :
                                        <button key={ind} className="btn btn-light mx-1" onClick={(e) => handleAction(e, player)} value={op.status}>{op.status}</button>
                                )}
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default PlayerStatus