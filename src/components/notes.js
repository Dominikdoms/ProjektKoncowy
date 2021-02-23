import React, {useState, useEffect} from 'react';
// import "./notes.scss";

//-------------------------------
//----------SHOW NOTES-----------
//-------------------------------

export const Notes = () => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/notes?_sort=id&_order=desc')
            .then(r => r.json())
            .then(data => {
                setNotes(data)
            })
    }, [])

    const deleteNotes = (id) => {
        fetch(`http://localhost:3000/notes/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter((not) => not.id !== id))
            })
    }

    return (
        <>
            <div className={"notes-container container"}>
                <h1>Wszystkie Notatki</h1>
                <ul>{notes.map(notes => (

                    <section key={notes.id} className={"notes-all"}>
                        <article>
                            <div className={"notes-time"}>
                                <li>{notes.hour}</li>
                            </div>
                            <div className={"notes-description"}>
                                <li>
                                    {notes.description}
                                </li>
                            </div>
                            <div className={"notes-content"}>
                                <li>
                                    {notes.notes}
                                </li>
                            </div>
                        </article>
                        <button className={"notes-btn"} onClick={() => deleteNotes(notes.id)}>Usuń
                        </button>
                    </section>

                ))}</ul>
            </div>
        </>
    )
}