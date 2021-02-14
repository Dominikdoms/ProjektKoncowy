import React from 'react';
import forgetCurve1 from './../../src/images/kz1.jpeg'
import forgetCurve from './../../src/images/kz2.jpg'
import learnCurve from './../../src/images/kz3.jpeg'



export const Home = () => {
    return (
        <section className={"container"}>
            <img src={learnCurve} alt=""/>
            <img src={forgetCurve} alt=""/>
            <img src={forgetCurve1} alt=""/>
            <h1>Aplikacja</h1>
        </section>

    )
}