import React, {useState, useEffect} from 'react';
import Moment from "react-moment";//formatowanie dat
import 'moment-timezone'//ustawia strefy czasowe
import moment from 'moment'


//--------------------------
//------NOTIFICATIONS-------
//--------------------------

export const Notifications = ({dataset, tenMin, twoDay, OneWeek, OneMonth, OneYear}) => {

    return (
        <>
            <div className={"notes-container notifications notifications-container container "}>
                <h1>Wszystkich notatek do powtórki: {tenMin.length +
                twoDay.length + OneWeek.length + OneMonth.length + OneYear.length}
                </h1>

                <section>
                    {/*10 min; do 1 dzień*/}
                    <ul>{tenMin.map((el, index) => (
                        <article key={dataset[index].id} className={"notes-all tenMinutes"}>
                            <div className={"notes-time"}>
                                <li>{dataset[el].hour}</li>
                            </div>
                            <div className={"notes-description"}>
                                <li>{dataset[el].description}</li>
                            </div>
                            <div className={"notes-content"}>
                                <li>{dataset[el].notes}</li>
                            </div>
                        </article>
                    ))}</ul>

                    {/*2 dni; do 3 dni*/}
                    <ul>{twoDay.map((el, index) => (
                        <article key={dataset[index].id} className={"notes-all twoDays"}>
                            <div className={"notes-time"}>
                                <li>{dataset[el].hour}</li>
                            </div>
                            <div className={"notes-description"}>
                                <li>{dataset[el].description}</li>
                            </div>
                            <div className={"notes-content"}>
                                <li>{dataset[el].notes}</li>
                            </div>
                        </article>
                    ))}</ul>

                    {/*7 dni; do 8 dni*/}
                    <ul>{OneWeek.map((el, index) => (
                        <article key={dataset[index].id} className={"notes-all week"}>
                            <div className={"notes-time"}>
                                <li>{dataset[el].hour}</li>
                            </div>
                            <div className={"notes-description"}>
                                <li>{dataset[el].description}</li>
                            </div>
                            <div className={"notes-content"}>
                                <li>{dataset[el].notes}</li>
                            </div>
                        </article>
                    ))}</ul>

                    {/*30 dni; do 31dni*/}
                    <ul>{OneMonth.map((el, index) => (
                        <article key={dataset[index].id} className={"notes-all month"}>
                            <div className={"notes-time"}>
                                <li>{dataset[el].hour}</li>
                            </div>
                            <div className={"notes-description"}>
                                <li>{dataset[el].description}</li>
                            </div>
                            <div className={"notes-content"}>
                                <li>{dataset[el].notes}</li>
                            </div>
                        </article>
                    ))}</ul>

                    {/*365 dni; do 366dni*/}
                    <ul>{OneYear.map((el, index) => (
                        <article key={dataset[index].id} className={"notes-all year"}>
                            <div className={"notes-time"}>
                                <li>{dataset[el].hour}</li>
                            </div>
                            <div className={"notes-description"}>
                                <li>{dataset[el].description}</li>
                            </div>
                            <div className={"notes-content"}>
                                <li>{dataset[el].notes}</li>
                            </div>
                        </article>
                    ))}</ul>
                </section>
            </div>
        </>
    )
}