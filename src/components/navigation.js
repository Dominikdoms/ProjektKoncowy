import React from 'react'
import {useEffect, useState} from "react";
import {
    HashRouter,
    Route,
    Link,
    Switch,
} from 'react-router-dom';
import {Home} from "./about";
import {Notifications} from "./notifications";
import {AddNot} from "./addNot";
import {Notes} from "./notes";
import {TenMinutes} from "./counters/tenMinutes";
import {TwoDays} from "./counters/twoDays";
import {Week} from "./counters/week";
import {Month} from "./counters/month";
import {Year} from "./counters/year";

export const Navigation = ({
                               indexesTenMin,
                               indexesTwoDay,
                               indexesOneWeek,
                               indexesOneMonth,
                               indexesOneYear,
                               AddDate,
                               dataset
                           }) => {
    const [showMenu, setShowMenu] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const handleShowMenu = e => {
        e.preventDefault();
        //ustawia odwrotną wartość stanu
        setShowMenu(!showMenu);
    }

    const checkMobile = () => {
        //sprawsza wielkość ekranu i zwraca obiekt,
        //w którym jest klucz matches wskazujący na true lub false
        const query = window.matchMedia("(min-width:938px)");
        //query.matches -odczutuje wartość klucza matches w obiekcie query

        //jeśli wartość matches = true, ustawia stan (isMobile) na false,
        //w przeciwnym razie na true
        setIsMobile(!query.matches);
        //ustatawia stan (ShowMenu) na wartość klucza matches
        setShowMenu(query.matches);
        // zwraca obiekt query
        return query;
    }

    //na starcie komponentu
    useEffect(() => {
        // const query = window.matchMedia("(min-width:720px)");
        //przypisuje zrócony obiekt i przypusuje do query
        const query = checkMobile();
        //na zmiane
        query.addListener((e) => {
            setIsMobile(!e.matches);
            setShowMenu(e.matches);
        });
    }, [])

    return (
        <>
            <HashRouter>
                <header className={"header"}>
                    <div className={"header__container container"}>
                        <section className={"header-notifications"}>
                            <div className={"notifications"}>
                                <TenMinutes indexesTenMin={indexesTenMin}/>
                                <TwoDays indexesTwoDay={indexesTwoDay}/>
                                <Week indexesOneWeek={indexesOneWeek}/>
                                <Month indexesOneMonth={indexesOneMonth}/>
                                <Year indexesOneYear={indexesOneYear}/>
                            </div>
                        </section>
                        <nav>
                            {isMobile && <div onClick={handleShowMenu} className={"menu__toggle"}>
                                <span/>
                                <span/>
                                <span/></div>}
                            {showMenu &&
                            <div className={"menu__list"}>
                                <ul>
                                    <li className={"nav-element"}>
                                        <Link to={"/home"}>Aplikacja</Link>
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
                    </div>
                </header>
                <Switch>
                    <div className={"content"}>
                        <Route exact path={"/home"}><Home/></Route>
                        <Route exact path={"/notes"}><Notes/></Route>
                        <Route exact path={"/addNot"}><AddNot onAddDate={AddDate}/></Route>
                        <Route exact path={"/notifications"}><Notifications
                            dataset={dataset}
                            tenMin={indexesTenMin}
                            twoDay={indexesTwoDay}
                            OneWeek={indexesOneWeek}
                            OneMonth={indexesOneMonth}
                            OneYear={indexesOneYear}/></Route>
                    </div>
                </Switch>
            </HashRouter>
        </>
    )
}
















