import React,{useState, useEffect} from 'react';

export const Home = ({tim}) => {
    return(
        <h1>{tim}</h1>
    )
}

export const Notes = ({tim}) => {
    return(
        <h1>{tim}</h1>
    )
}

export const AddNot = ({tim}) => {
const [desc, setDesc] = useState('')
const [notes, setNotes] = useState('')
    console.log(desc)
    console.log(notes);

    return(
        <>
        <h1>{tim}</h1>

            <form>
                <input type="text"
                       value={desc}
                       onChange={e => setDesc(e.target.value)}/>
                <label>
                    <p>Notatki</p>
                    <textarea name="notes"
                              cols="30"
                              rows="10"
                              value={notes}
                              onChange={e => setNotes(e.target.value)}/>
                </label>
            </form>
        </>
    )
}

export const Notifications = ({tim}) => {
    return(
        <h1>{tim}</h1>
    )
}
























