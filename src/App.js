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
            if ((dataset[i].time + 600000) < currentTime && (dataset[i].time+ 3600000) > currentTime) {
                indexTenMin.push(i)
            }
            // 1h: 3600000 ms
            if ((dataset[i].time + 3600000) < currentTime && (dataset[i].time+ 3600000) > 172800000) {
                indexOneHour.push(i)
            }
            // 2dni: 172800000 ms;    30dni: 2592000000 ms
            if ((dataset[i].time + 172800000) < currentTime && (dataset[i].time+ 3600000) > 2592000000) {
                indexTwoDay.push(i)
            }
        }
        setIndexesTenMin(indexTenMin);
        setIndexesOneHour(indexOneHour);
        setIndexesTwoDay(indexTwoDay);
    }, [currentTime])//odpala się przy każdej
    // aktualizacji aktualnego czasu
    // console.log(indexes);


    const [showMenu, setShowMenu] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const handleShowMenu = e => {
        e.preventDefault();
        setShowMenu(!showMenu);
    }
    useEffect(() => {
        const query = window.matchMedia("(min-width:720px)");
        query.addListener((e) => {
            setIsMobile(!e.matches);
            setShowMenu(e.matches);
        });
    }, [])


    return (
        <HashRouter>
            <nav>
                {isMobile && <a onClick={handleShowMenu}>Menu</a>}
                {showMenu &&
                <ul>
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
                </ul>}
                <div>
                    <p style={{color: "red"}}>Pierwsza powtórka: {indexesTenMin.length}</p>
                    <p style={{color: "blue"}}>Druga powtórka: {indexesOneHour.length}</p>
                    <p style={{color: "green"}}>Trzecia powtórka: {indexesTwoDay.length}</p>
                </div>
            </nav>


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

// const[showMenu, setShowMenu] = useState(true);
// const[isMobile, setIsMobile] = useState(true);
// const handleShowMenu = e => {
//     e.preventDefault();
//     setShowMenu(!showMenu);
// }
// useEffect( () =>{
//     const query = window.matchMedia("(min-width:720px)");
//     query.addListener( (e)=>{
//         setIsMobile(!e.matches);
//         setShowMenu(e.matches);
//     });
// }, [])
// return (
//     <nav>
//         {isMobile && <a onClick={handleShowMenu}>Menu</a>}
//         {showMenu  &&
//         <ul>
//             <li><a href="">Link1</a></li>
//             <li><a href="">Link2</a></li>
//             <li><a href="">Link3</a></li>
//             <li><a href="">Link4</a></li>
//             <li><a href="">Link5</a></li>
//         </ul>
//         }
//     </nav>
// );
// }


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
