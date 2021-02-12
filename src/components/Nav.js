import React, {useState, useEffect} from 'react';
import Moment from "react-moment";//formatowanie dat
import 'moment-timezone'//ustawia strefy czasowe

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

    useEffect(() => {
        fetch('http://localhost:3000/notes')
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
                    <>
                        <section className={"notes-all"}>

                            <div className={"notes-time"}>
                                <li key={notes.id + 5}>{notes.hour}</li>
                            </div>
                            <div className={"notes-description"}>
                                <li key={notes.id + 4}>
                                    {notes.description}
                                </li>
                            </div>
                            <div className={"notes-content"}>
                                <li key={notes.id + 2}>
                                    {notes.notes}
                                </li>
                            </div>
                            <button className={"notes-btn"} key={notes.id} onClick={() => deleteNotes(notes.id)}>Usuń</button>
                        </section>
                    </>
                ))}</ul>
            </div>
        </>
    )
}


//--------------------------
//--------ADD NOTES---------
//--------------------------
export const AddNot = ({onAddDate}, {tim}) => {

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
                hour: new Date(),//.toLocaleTimeString(),
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
                    .then((r) => r.json())
                    .then((data) => {
                        if (typeof onAddDate === 'function') {
                            onAddDate(data)
                        }
                    })
            }
            setNotes("")
            setDescription("")
        }
    }


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

export const Notifications = ({tim, dataset, tenMin, twoDay, OneWeek, OneMonth, OneYear}) => {

    return (
        <>
            <div className={"notifications notifications-container container "}>
                <h1>Wszystkich notatek do powtórki: {tenMin.length +
                twoDay.length + OneWeek.length + OneMonth.length + OneYear.length}
                </h1>

                {/*10 min; do 1 dzień*/}
                <ul style={{color: "red"}}>{tenMin.map((el, index) => (
                    <>
                        <li key={dataset[index].id + 2}>{dataset[el].hour}</li>
                        <li key={dataset[index].id}>{dataset[el].description}</li>
                        <li key={dataset[index].id + 1}>{dataset[el].notes}</li>
                    </>
                ))}</ul>

                {/*2 dni; do 3 dni*/}
                <ul style={{color: "green"}}>{twoDay.map((el, index) => (
                    <>
                        <li key={dataset[index].id + 2}>{dataset[el].hour}</li>
                        <li key={dataset[index].id}>{dataset[el].description}</li>
                        <li key={dataset[index].id + 1}>{dataset[el].notes}</li>
                    </>
                ))}</ul>

                {/*7 dni; do 8 dni*/}
                <ul style={{color: "blue"}}>{OneWeek.map((el, index) => (
                    <>
                        <li key={dataset[index].id + 2}>{dataset[el].hour}</li>
                        <li key={dataset[index].id}>{dataset[el].description}</li>
                        <li key={dataset[index].id + 1}>{dataset[el].notes}</li>
                    </>
                ))}</ul>

                {/*30 dni; do 31dni*/}
                <ul style={{color: "purple"}}>{OneMonth.map((el, index) => (
                    <>
                        <li key={dataset[index].id + 2}>{dataset[el].hour}</li>
                        <li key={dataset[index].id}>{dataset[el].description}</li>
                        <li key={dataset[index].id + 1}>{dataset[el].notes}</li>
                    </>
                ))}</ul>

                {/*365 dni; do 366dni*/}
                <ul style={{color: "orange"}}>{OneYear.map((el, index) => (
                    <>
                        <li key={dataset[index].id + 2}>{dataset[el].hour}</li>
                        <li key={dataset[index].id}>{dataset[el].description}</li>
                        <li key={dataset[index].id + 1}>{dataset[el].notes}</li>
                    </>
                ))}</ul>
            </div>
        </>
    )
}


// export const Notifications = ({tim, dataset, tenMin, oneHour, twoDay}) => {
//     const [notes, setNotes] = useState([])
// NIE DZIAŁA JESZCZE/// Można przećwiczyć, ale już nie potrzebuje tej funkcji
//     const addId = (id) => {
//         const data = {
//             tenId: id
//         };
//
//         fetch(`http://localhost:3000/notes/${id}`, {
//             method: "PATCH",
//
//             body: JSON.stringify(data),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 setNotes((prevNotes) => prevNotes.filter((not) => not.id !== id))
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }








