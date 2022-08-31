import React from "react"
import axios from "axios"
import Form from './Form'
import { Link, useHistory } from 'react-router-dom'

const NewPlayer = () => {
    const [player, setPlayer] = React.useState({
        name: '',
        position: 'Forward',
        games: [ {status:'Undecided'} , {status:'Undecided'}, {status:'Undecided'}]


    })
    // const [isCreated, setIsCreated] = React.useState(false)

    const [errorName, setErrorName] = React.useState({
        msg: '',
        isError: true,
    });
    const history = useHistory()


    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setPlayer({ ...player, [name]: value })

        //handle errors
        if (name == 'name') {
            setErrorName({ ...errorName, msg: '', isError: true })
            if (value.length < 3 && value.length != 0) {
                setErrorName({ msg: `Name must be at least 3`, isError: true })
            }
            else if (value.length >= 3) {
                setErrorName({ msg: '', isError: false })
            }

        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        //create new player
        axios.post(`http://localhost:8000/api/players/new`, player)
            .then(res => {
                // setIsCreated(true)
                history.push('/')
            })
            .catch(err => {
                console.log(err)

            })

    }
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <h3 className="mt-5">Add a new player</h3>
                {errorName &&
                    <div className="text-danger">{errorName.msg}</div>}
                <Form {...player} handleChange={handleChange} handleSubmit={handleSubmit} value="Add" isError={errorName.isError} />
            </div>
        </div>
    )
}

export default NewPlayer