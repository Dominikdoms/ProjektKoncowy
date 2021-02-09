//tu obsługuje stan database czyli db.json


const url = 'http://localhost:3000';

const getAllNotes = ( callback, errorCallback ) =>{
    fetch(`${url}/notes`)
        .then(resp => resp.json())
        .then(data => callback(data) )
        .catch(e => errorCallback(e));
}

const addNewNote = (note, callback, errorCallback) => {
    fetch(`${url}/notes`,{
        method:"POST",
        body: JSON.parse(note),
        headers:{
            "Content-Type":"application/json"
        }
    })
        .then(resp => resp.json())
        .then(data => callback(data) )
        .catch(e => errorCallback(e));
}

export {getAllNotes, addNewNote}