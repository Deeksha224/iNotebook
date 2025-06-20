import { useContext } from 'react';
import NoteContext from '../context/note/noteContext';



const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    // Destructure the note from props.This allows us to access the note's properties directly without needing to use props.note.title, etc.
    const { note,updateNote } = props;
    return (
        <div className="col-md-3 my-3">
            
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Notes deleted Successfully","success");}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div >
    )
}

export default Noteitem
