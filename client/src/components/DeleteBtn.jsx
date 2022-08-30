import axios from "axios"

const DeleteBtn = (props) => {
    const handleClick = () => {
        axios.delete(`http://localhost:8000/api/players/delete/${props.id}`)
            .then( props.handleDelete(props.id))
            .catch( err => console.log(err))
    }
    return (
        <input type="submit" className="btn btn-dark" value={props.value||'Delete'} onClick={handleClick}/>
    )
}

export default DeleteBtn