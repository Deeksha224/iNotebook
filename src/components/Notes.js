import { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/note/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';

const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNote, editNote } = context;
    useEffect(() => {
        getNote()
       // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refclose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }



    const handleSubmit = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
        props.showAlert("Notes updated Successfully", "success");

    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }); // Update the note state with the input values
    }


    return (
        <>
            <Addnote showAlert={props.showAlert} />

            {/* MODAL */}

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between align-items-center">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" ref={refclose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form className="container my-3">
                                <div className="mb-3">

                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleSubmit} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleSubmit} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className='container'>
                    {notes.length === 0 && "No notes to Display"}
                </div>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                    })
                }
            </div>
        </>

    )
}

export default Notes
