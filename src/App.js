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
    const [dataset, setDataset] = useState([])
    const [currentTime, setCurrentTime] = useState('')//new Date().getTime()
    const [indexesTenMin, setIndexesTenMin] = useState([]);
    const [indexesOneHour, setIndexesOneHour] = useState([]);
    const [indexesTwoDay, setIndexesTwoDay] = useState([]);
    // console.log(indexesTenMin);
    // console.log(indexesOneHour);
    // console.log(indexesTwoDay);

    useEffect(() => {
        fetch('http://localhost:3000/notes')
            .then(r => r.json())
            .then(data => {
                setDataset(data)
            })

        const intervalId = setInterval(() => {
            setCurrentTime(new Date().getTime())
        }, 2000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const AddDate = (data) => {
        setDataset(prevState => [...prevState, data])
    }

    useEffect(() => {
        const indexTenMin = [];
        const indexOneHour = [];
        const indexTwoDay = [];
        for (let i = 0; i < dataset.length; i++) {
            // 10min: 600000
            if ((dataset[i].time + 600000) < currentTime) {
                indexTenMin.push(i)
            }
            // 1h: 3600000 ms
            if ((dataset[i].time + 3600000) < currentTime) {
                indexOneHour.push(i)
            }
            // 2dni: 172800000 ms
            if ((dataset[i].time + 172800000) < currentTime) {
                indexTwoDay.push(i)
            }
        }
        setIndexesTenMin(indexTenMin);
        setIndexesOneHour(indexOneHour);
        setIndexesTwoDay(indexTwoDay);
    }, [currentTime])//odpala się przy każdej
    // aktualizacji aktualnego czasu
    // console.log(indexes);

    return (
        <HashRouter>
            <ul style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                <li>
                    <Link to={"/home"}>Strona główna</Link>
                </li>
                <li>
                    <Link to={"/notes"}>Wszystkie notatki</Link>
                </li>
                <li>
                    <Link to={"/addNot"}>Dodaj notatkę</Link>
                </li>

                <li>
                    <Link to={"/notifications"}>Powtórka</Link>
                </li>

                <div style={{display: "flex"}}>
                    <p style={{color: "red", paddingRight: 10}}>{indexesTenMin.length}</p>
                    <p style={{color: "blue"}}>{indexesOneHour.length}</p>
                    <p style={{color: "green", paddingLeft: 10}}>{indexesTwoDay.length}</p>
                </div>

            </ul>
            <Switch>
                <Route exact path={"/home"}>
                    <Home tim={"Strona główna"}/>
                </Route>

                <Route exact path={"/notes"}>
                    <Notes tim={"Wszystkie notatki:"}/>
                </Route>

                <Route exact path={"/addNot"}>
                    <AddNot onAddDate={AddDate} tim={"Dodaj notatkę:"}/>
                </Route>

                <Route exact path={"/notifications"}>
                    <Notifications
                        dataset={dataset}
                        tenMin={indexesTenMin}
                        oneHour={indexesOneHour}
                        twoDay={indexesTwoDay}
                        tim={"Powtórka"}/>
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
