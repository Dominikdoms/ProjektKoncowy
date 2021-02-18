import React, {useState} from 'react';
// import Moment from "react-moment";//formatowanie dat
import 'moment-timezone'//ustawia strefy czasowe
import moment from 'moment'


//--------------------------
//--------ADD NOTES---------
//--------------------------
export const AddNot = ({onAddDate}) => {

    const [description, setDescription] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState("")

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
                notes,
                hour: moment().format('MMMM Do YYYY, h:mm:ss a'), //new Date(),//.toLocaleTimeString(),
                time: new Date().getTime()
            }

            if (newError.length === 0) {
                fetch('http://localhost:3000/notes', {
                    method: "POST",
                    body: JSON.stringify(newNotes),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    //fetch w odpowiedzi zwraca promise.
                    .then((r) => r.json())
                    .then((data) => {//mamy dostęp do obiektu, który został utworzony w basie danych
                        if (typeof onAddDate === 'function') {
                            //przekazujemy do funkcji dodany dbiekt
                            onAddDate(data)
                            // console.log(data)
                        }
                    })
            }
            setNotes("")
            setDescription("")
        }
    }

    return (
        <section className={"addNot-container container"}>
            <div className={"addNot"}>
                <h1>DODAJ NOTATKĘ</h1>

                <form onSubmit={handleSubmit}>
                    <input className={"input-description"}
                           type="text"
                           placeholder={"Opis"}
                           value={description}
                           onChange={e => setDescription(e.target.value)}/>
                    <label>
                    <textarea className={"textarea-content"}
                              name="notes"
                              placeholder={"Notatka"}
                              value={notes}
                              onChange={e => setNotes(e.target.value)}/>
                    </label>

                    <p className={"error"}>{error}</p>
                    <button className={"btn"}>Add Notes</button>
                </form>
            </div>
        </section>
    )
}
