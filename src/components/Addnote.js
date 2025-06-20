import { useContext, useState } from 'react';
import NoteContext from '../context/note/noteContext';

// This component allows users to add a new note with a title, description, and tag.
// It uses the NoteContext to access the addNote function for adding notes.

const Addnote = (props) => {
    const context = useContext(NoteContext); 
    const {addNote} = context;
    
    const[note, setNote] = useState({title: "", description: "", tag: "default"}); //use state hook

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        addNote(note.title, note.description, note.tag); // Call the addNote function from context to add the note
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Notes added     Successfully","success");

    }
    const onchange = (e) => {
        setNote({...note, [e.target.name]: e.target.value}); // Update the note state with the input values
    }
        

    
    return (
        <div>
            <div className="container my-3">
                <h2>Add Notes</h2>
            </div>
            <form className="container my-3">
                <div className="mb-3">

                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title}  onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag"  value={note.tag} onChange={onchange} />
                </div>
                
                <div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Notes</button>
                </div>
            </form>
        </div>
    )
}

export default Addnote
