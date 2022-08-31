import React from 'react';
import Popup from 'reactjs-popup';
import style from './Popup.modules.css'
import DeleteBtn from './DeleteBtn';

const Pop_up = (props) => {
    return (<Popup
        trigger={<button className="btn btn-dark"> Delete </button>}
        modal
        nested
    >
        {close => (
            <div className={style.modal} style={{ padding: "5px" }}>
                <button className="btn btn-light d-flex align-items-center justify-content-center" style={{ height: "10px", width: "10px", padding: "10px" }} onClick={close}>
                    &times;
                </button>
                <div className={style.content} style={{ padding: "5px", marginTop: "10px", marginBottom: "10px" }}>
                    Are you sure you want to remove {props.name} ?
                </div>
                <div className={style.actions}>
                    <DeleteBtn id={props.id} handleDelete={() => props.handleDelete(props.id)} value="Yes" />
                    <button
                        className="btn btn-dark mx-1"
                        onClick={() => {
                            close();
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        )}
    </Popup>)
};

export default Pop_up