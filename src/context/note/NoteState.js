import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const NotesInitials = []
    const [notes, setNotes] = useState(NotesInitials);

    //get all Note
    const getNote = async() => {

        //Api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });
        
        const json = await response.json();
        setNotes(json);
    }

    //Add a Note
    const addNote = async(title, description, tag) => {

        //Api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag })
            
        });
            const note = await response.json();
        setNotes(notes.concat(note))

    }

    // Delete a Note
    const deleteNote = async(id) => {

        //Api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            
        });
        const json = await response.json();
        console.log(json);

        
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)

    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {

        //Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        const newNote = JSON.parse(JSON.stringify(notes))
        // logoc to edit in client
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title= title;
                newNote[index].description = description;
                newNote[index].tag= tag;
                break;
            }
        }
        setNotes(newNote);

    }
    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;