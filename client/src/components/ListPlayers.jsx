import { Link } from "react-router-dom"
import React from "react"
import axios from 'axios'
import DeleteBtn from './DeleteBtn'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pop_up from "./Pop-up";

const ListPlayers = () => {
    const [players, setPlayers] = React.useState([])
    const [isDeleted, setIsDeleted] = React.useState(false)
    React.useEffect(() => {
        axios.get(`http://localhost:8000/api/players`)
            .then(res => setPlayers(res.data.players))
            .catch(err => console.log(err))
    }, [isDeleted])

    const handleDelete = (id) => {
        setPlayers(players.filter(a => a._id == id))
        setIsDeleted(true)
    }
    return (
        <div className="container p-5">
            <div className="d-flex">
                <h4 className="">Players List | <Link to='/new'> Add Player</Link></h4>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Player name</th>
                        <th>Preferred position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(a =>
                        <tr key={a._id}>
                            <td>{a.name}</td>
                            <td>{a.position}</td>
                            <td>
                                {/* <Link className="btn btn-dark mx-1" to={l => `/edit/${a._id}`}>Edit</Link> */}
                                <Pop_up name={a.name} id={a._id} handleDelete={() => handleDelete(a._id)}/>
                                
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default ListPlayers