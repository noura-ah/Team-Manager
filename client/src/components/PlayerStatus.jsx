import { Link } from "react-router-dom"
import React from "react"
import axios from 'axios'

const PlayerStatus = () => {
    const [players, setPlayers] = React.useState([])
    const [isStatusChanged, setIsStatusChanged] = React.useState(false)
    const [status, setStatus] = React.useState('game1')
    let statusOption = [
        { statue: 'Undecided', color: 'yellow' },
        { statue: 'Playing', color: 'green' },
        { statue: 'Not Playing', color: 'red' }
    ]
    React.useEffect(() => {
        axios.get(`http://localhost:8000/api/players`)
            .then(res => setPlayers(res.data.players))
            .catch(err => console.log(err))
        setIsStatusChanged(false)
    }, [isStatusChanged])

    // op==a[status]? <button style={{backgroundColor:"red"}}>{op}</button>:
    const handleClick = (e) => {
        setStatus(e.target.value)
    }

    const handleAction = (e, player) => {
        axios.put(`http://localhost:8000/api/players/update/${player._id}`, { ...player, [status]: e.target.value })
            .then(setIsStatusChanged(true))
            .catch(err => console.log(err))
    }
    return (
        <div className="container p-5">
            <h3 className="d-flex mb-4">Player Status - <span className="mx-1"> Game 1 { } </span></h3>
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-link" value="game1" onClick={handleClick}>Game 1</button> <span> | </span>
                <button className="btn btn-link" value="game2" onClick={handleClick}>Game 2</button> <span> | </span>
                <button className="btn btn-link" value="game3" onClick={handleClick}>Game 3</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Player name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(a =>
                        <tr key={a._id}>
                            <td>{a.name}</td>
                            <td>
                                {statusOption.map((op,index) =>
                                    op.statue == a[status] ?
                                        <button key={index} className="btn mx-1" style={{ backgroundColor: op.color }} onClick={(e) => handleAction(e,a)}  value={op.statue}>{op.statue}</button> :
                                        <button key={index}  className="btn btn-light mx-1" onClick={(e) => handleAction(e,a)} value={op.statue}>{op.statue}</button>
                                )}
                                {/* {a[status]} */}
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default PlayerStatus