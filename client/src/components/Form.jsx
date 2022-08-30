import { Link } from "react-router-dom"
const Form = (props) => {
    const { name,position, handleChange, handleSubmit, value, isError } = props
    return (
        <form className="form container px-5" onSubmit={handleSubmit}>
            <div className="d-flex align-items-center px-5 mt-4">
                <label className="form-label w-100">Player Name:</label>
                <input className="form-control" value={name} name="name" onChange={handleChange} />
            </div>
            <div className="d-flex align-items-center px-5 mt-4">
                <label className="form-label w-100">Preferred Position:</label>
                <select className="form-control" value={position} name="position" onChange={handleChange}>
                    <option value="Forward">Forward</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                </select>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                {isError ?

                    <input className="btn btn-light m-3" value={value} type="submit" disabled /> :
                    <input className="btn btn-light m-3" value={value} type="submit" />
                }

            </div>
        </form>
    )
}

export default Form