import './sass/main.scss'
import {useEffect, useState} from "react";
import {addNewNote, getAllNotes} from "./services/api-service";


function App(){
  const [notes, setNotes] = useState([]);
  useEffect(  () =>{
    getAllNotes(data => setNotes(data), err => console.log());
  },[])

  const handleAddNote = () => {
    //create noteObje
    const note = {
      content: "",

    }
    addNewNote(note);
  }
  return (
    <div className="App">

    </div>
  );
}

export default App;
//app jest odpalony w pliku index.js
//a w tym pliku muszę z niego skorzystać :)
//dlatego jest importowany


//DAREK:
// import './sass/main.scss'
// import {useEffect, useState} from "react";
// import {addNewNote, getAllNotes} from "./services/api-service";
//
//
// function App(){
//   const [notes, setNotes] = useState([]);
//   useEffect(  () =>{
//     getAllNotes(data => setNotes(data), err => console.log());
//   },[])
//
//   const handleAddNote = () => {
//     //create noteObje
//     const note = {
//       content: "",
//
//     }
//     addNewNote(note);
//   }
//   return (
//       <div className="App">
//
//       </div>
//   );
// }
