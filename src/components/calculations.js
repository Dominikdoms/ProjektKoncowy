import React from 'react'
import {useEffect, useState} from "react";
import {Navigation} from "./navigation";


export const Calculations = () => {

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
        setDataset(prevState => [data, ...prevState])
    }

    useEffect(() => {
        // przypisywanie do tablic
        const indexTenMin = [];
        const indexTwoDay = [];
        const indexOneWeek = [];
        const indexOneMonth = [];
        const indexOneYear = [];

        for (let i = 0; i < dataset.length; i++) {
            // od 10min: 600000;     do 1 dzień: 86400000 ms;
            if ((dataset[i].time + 600000) < currentTime && (dataset[i].time + 86400000) > currentTime) {
                indexTenMin.push(i)
            }
            // od 2dni: 172800000 ms;  do 3dni: 259200000 ms;
            if ((dataset[i].time + 172800000) < currentTime && (dataset[i].time + 259200000) > currentTime) {
                indexTwoDay.push(i)
            }
            // od 7dni: 604800000 ms;   do 8dni: 691200000 ms;
            if ((dataset[i].time + 604800000) < currentTime && (dataset[i].time + 691200000) > currentTime) {
                indexOneWeek.push(i)
            }
            //od 30 dni: 2592000000 ms;   do 32dni: 2678400000 ms;
            if ((dataset[i].time + 2592000000) < currentTime && (dataset[i].time + 2678400000) > currentTime) {
                indexOneMonth.push(i)
            }
            //od 365 dni: 31536000000 ms;   do 366dmi: 31622400000 ms;
            if ((dataset[i].time + 31536000000) < currentTime && (dataset[i].time + 31622400000) > currentTime) {
                indexOneYear.push(i)
            }
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


    return (
        <Navigation indexesTenMin={indexesTenMin}
                    indexesTwoDay={indexesTwoDay}
                    indexesOneWeek={indexesOneWeek}
                    indexesOneMonth={indexesOneMonth}
                    indexesOneYear={indexesOneYear}
                    AddDate={AddDate}
                    dataset={dataset}/>
    )
}



