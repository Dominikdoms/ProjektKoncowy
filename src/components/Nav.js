import React, {useState, useEffect} from 'react';

//-----------------------
//---------HOME----------
//-----------------------
export const Home = ({tim}) => {
    return (
        <h1>{tim}</h1>
    )
}

//-------------------------------
//----------SHOW NOTES-----------
//-------------------------------

export const Notes = ({tim}) => {
const [notes, setNotes] = useState([])
    console.log(notes)
    useEffect(() => {
        fetch('http://localhost:3000/notes')
            .then(r => r.json())
            .then(data => {
                setNotes(data)
                // console.log(data)
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
            <h1>{tim}</h1>
            <ul>{notes.map(notes => (
                <>
                <li style={{paddingTop: 20}}
                    key={notes.id}>
                    {notes.description}
                </li>
                <li key={notes.id}>
                    {notes.notes}
                </li>
                    <button key={notes.id} onClick={() => deleteNotes(notes.id)}>Usuń</button>
                </>
            ))}</ul>
        </>
    )
}


//--------------------------
//--------ADD NOTES---------
//--------------------------
export const AddNot = ({tim}) => {
    // const [not, setNot] = useState([])

    const [description, setDescription] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState("")
    console.log(description)
    console.log(notes);


    const addNotes = (notes) => {
        // setNot(prevState => [...prevState, notes])
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        const newError = [];
        if (description < 1) newError.push(1)
        if (notes < 1) newError.push(1)
        if (newError.length !== 0) {
            setError("Musi być przynajmniej jeden znak")
        } else {
            setError("")

            const newNotes = {
                description,
                notes
            }

            if (newError.length === 0) {
                fetch('http://localhost:3000/notes', {
                    method: "POST",
                    body: JSON.stringify(newNotes),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then((r) => r.json())
                    .then((notes) => {
                        if (typeof addNotes === "function") {
                            addNotes(notes)
                        }
                    })

            }
            setNotes("")
            setDescription("")
        }
    }
    useEffect(() => {
        fetch('http://localhost:3000/notes')
            .then(r => r.json())
            .then(data => {
                // console.log(data)
            })
    },[])

    return (
        <>
            <h1>{tim}</h1>

            <form onSubmit={handleSubmit}>
                <p>Opis:</p>
                <input type="text"
                       value={description}
                       onChange={e => setDescription(e.target.value)}/>
                <label>
                    <p>Notatka:</p>
                    <textarea name="notes"
                              cols="30"
                              rows="10"
                              value={notes}
                              onChange={e => setNotes(e.target.value)}/>
                </label>
                <p style={{color: "red"}}>{error}</p>
                <button>Add Notes</button>
            </form>
        </>
    )
}


//--------------------------
//------NOTIFICATIONS-------
//--------------------------

export const Notifications = ({tim}) => {
    return (
        <h1>{tim}</h1>
    )
}
























