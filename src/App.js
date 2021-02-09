import './sass/main.scss'
import {useEffect, useState} from "react";
import {addNewNote, getAllNotes} from "./services/api-service";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import {Home, Notes, AddNot, Notifications} from './components/Nav'





const App = () => {
  return(
      <HashRouter>
          <ul style={{display: "flex", justifyContent: "space-around"}}>
              <li>
                  <Link to={"/home"}>Home</Link>
              </li>
              <li>
                  <Link to={"/notes"}>Notes</Link>
              </li>
              <li>
                  <Link to={"/addNot"}>Add notes</Link>
              </li>
              <li>
                  <Link to={"/notifications"}>Notifications</Link>
              </li>
          </ul>
          <Switch>
              <Route exact path={"/home"}>
                  <Home tim={"home"}/>
              </Route>

              <Route exact path={"/notes"}>
                  <Notes tim={"notes"}/>
              </Route>

              <Route exact path={"/addNot"}>
                  <AddNot tim={"addNot"}/>
              </Route>

              <Route exact path={"/notifications"}>
                  <Notifications tim={"notifications"}/>
              </Route>
          </Switch>
      </HashRouter>
  )
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
