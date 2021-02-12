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
    const [dataset, setDataset] = useState([])//dane z JSON SERVER
    const [currentTime, setCurrentTime] = useState('')//new Date().getTime()

    const [indexesTenMin, setIndexesTenMin] = useState([]);
    const [indexesTwoDay, setIndexesTwoDay] = useState([]);
    const [indexesOneWeek, setIndexesOneWeek] = useState([]);
    const [indexesOneMonth, setIndexesOneMonth] = useState([]);
    const [indexesOneYear, setIndexesOneYear] = useState([]);


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
        // przypisywanie do tablic
        const indexTenMin = [];
        const indexTwoDay = [];
        const indexOneWeek = [];
        const indexOneMonth = [];
        const indexOneYear = [];

        for (let i = 0; i < dataset.length; i++) {
            //-------------------------------------
            //------------PEŁNA WERSJA-------------
            //-------------------------------------
            // // od 10min: 600000;     do 1 dzień: 86400000 ms;
            // if ((dataset[i].time + 600000) < currentTime && (dataset[i].time+ 86400000) > currentTime) {
            //     indexTenMin.push(i)
            // }
            // // od 2dni: 172800000 ms;  do 3dni: 259200000 ms;
            // if ((dataset[i].time + 172800000) < currentTime && (dataset[i].time+ 259200000) > currentTime) {
            //     indexTwoDay.push(i)
            // }
            // // od 7dni: 604800000 ms;   do 8dni: 691200000 ms;
            // if ((dataset[i].time + 604800000) < currentTime && (dataset[i].time+ 691200000) > currentTime) {
            //     indexOneWeek.push(i)
            // }
            // //od 30 dni: 2592000000 ms;   do 32dni: 2678400000 ms;
            // if ((dataset[i].time + 2592000000) < currentTime && (dataset[i].time+ 2678400000) > currentTime) {
            //     indexOneMonth.push(i)
            // }
            // //od 365 dni: 31536000000 ms;   do 366dmi: 31622400000 ms;
            // if ((dataset[i].time + 31536000000) < currentTime && (dataset[i].time+ 31622400000) > currentTime) {
            //     indexOneYear.push(i)
            // }
            //-------------------------------
            //-----TESTOWANIE NOTATNOKA------
            //-------------------------------
            // od 5s: 5000;     do 10s 10000 ms;
            if ((dataset[i].time + 5000) < currentTime && (dataset[i].time + 10000) > currentTime) {
                indexTenMin.push(i)
            }
            // od 15s: 15000 ms;     do 20s: 20000 ms;
            if ((dataset[i].time + 15000) < currentTime && (dataset[i].time + 20000) > currentTime) {
                indexTwoDay.push(i)
            }
            // od 25s: 25000 ms;   do 30s 30000 ms;
            if ((dataset[i].time + 25000) < currentTime && (dataset[i].time + 30000) > currentTime) {
                indexOneWeek.push(i)
            }
            // od 35s: 35000 ms;     do 40s: 40000 ms;
            if ((dataset[i].time + 35000) < currentTime && (dataset[i].time + 40000) > currentTime) {
                indexOneMonth.push(i)
            }
            // od 45s: 45000 ms;      do 50s: 50000 ms;
            if ((dataset[i].time + 45000) < currentTime && (dataset[i].time + 50000) > currentTime) {
                indexOneYear.push(i)
            }
            //-------------------------------------------
        }
        //przypisywanie wartości tablic do state
        setIndexesTenMin(indexTenMin);
        setIndexesTwoDay(indexTwoDay);
        setIndexesOneWeek(indexOneWeek)
        setIndexesOneMonth(indexOneMonth)
        setIndexesOneYear(indexOneYear)
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
        <>

            <HashRouter>
                <header className={"header__container container"}>
                    <div className={"header-notifications"}>
                        <div>
                            <p className={"tenMinutes"}>1 powtórka: {indexesTenMin.length} - notatek</p>
                            <p className={"twoDays"}>2 powtórka: {indexesTwoDay.length} - notatek</p>
                            <p className={"week"}>3 powtórka: {indexesOneWeek.length} - notatek</p>
                        </div>
                        <div>
                            <p className={"month"}>4 powtórka: {indexesOneMonth.length} - notatek</p>
                            <p className={"year"}>5 powtórka: {indexesOneYear.length} - notatek</p>
                        </div>
                    </div>
                    <nav>
                        {isMobile && <div onClick={handleShowMenu} className={"menu__toggle"}>
                            <span/>
                            <span/>
                            <span/></div>}

                        {showMenu &&
                        <div className={"menu__list"}>
                            <ul>
                                <li className={"nav-element"}>
                                    <Link to={"/home"}>Strona główna</Link>
                                </li>
                                <li className={"nav-element"}>
                                    <Link to={"/notes"}>Wszystkie notatki</Link>
                                </li>
                                <li className={"nav-element"}>
                                    <Link to={"/addNot"}>Dodaj notatkę</Link>
                                </li>

                                <li className={"nav-element"}>
                                    <Link to={"/notifications"}>Powtórka</Link>
                                </li>
                            </ul>
                        </div>
                        }
                    </nav>
                </header>


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
                            twoDay={indexesTwoDay}

                            OneWeek={indexesOneWeek}
                            OneMonth={indexesOneMonth}
                            OneYear={indexesOneYear}

                            tim={"Powtórka"}/>
                    </Route>
                </Switch>
            </HashRouter>
        </>
    )
}

export default App;


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
