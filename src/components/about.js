import React from 'react';
import forgetCurve1 from './../../src/images/kz1.jpeg'
import forgetCurve from './../../src/images/kz2.jpg'
import learnCurve from './../../src/images/kz3.jpeg'


export const Home = () => {
    return (
        <section className={"about-container container"}>
            <p className={"about-openSection"}>Aby się czegoś trwale nauczyć, trzeba powtarzać to wielokrotnie i
                systematycznie. Aplikacja wykorzystuje krzywą zapamiętywania, stworzoną na podstawie wyników badań
                <a target={"_blank"} href="https://pl.wikipedia.org/wiki/Hermann_Ebbinghaus">
                    <span> Hermanna Ebbinghausa</span></a>.</p>
            <div className={"about-breakPoints"}>

                <div className={"about-tenMinutes"}><p className={"breakPoint"}>Pierwsza Powtórka po 10 min</p></div>
                <div className={"about-twoDays"}><p className={"breakPoint"}>Druga powtórka po 2 dniach</p></div>
                <div className={"about-week"}><p className={"breakPoint"}>Trzecia powtórka po tygodniu</p></div>
                <div className={"about-month"}><p className={"breakPoint"}>Czwarta powtórka po miesiącu</p></div>
                <div className={"about-year"}><p className={"breakPoint"}>Piąta powtórka po roku</p></div>

            </div>
            <p className={"about-text"}>Późniejsze badania doprecyzowały odkrycie Ebbinghausa. Pokazały m.in., że
                najwięcej informacji pamiętamy,
                nie jak mogło by się wydawać, pod koniec nauki, a około 10 minut po jej zakończeniu. Do tego czasu nasz
                mózg wciąż intensywnie przetwarza zgromadzone informacje, próbując je uporządkować i powiązać (proces
                ten nazywamy inkubacją). Wtedy właśnie (10-15 minut po zakończeniu nauki) wypada idealny moment na
                pierwszą powtórkę</p>
            <div className={"about-pictures"}>
                <a className={"learnCurve"}  target={"_blank"} href="http://www.ke.edu.pl/pl/wiadomosc/186-interwaly-czyli-jak-sie-uczyc-aby-jak-najwiecej-zapamietac">
                <img src={learnCurve} className={"learnCurve-img"} alt="learning Curve"/>
                </a>
                <a className={"forgetCurve1"} target={"_blank"} href="http://zorganizowani.com/szybka-nauka/krzywa-ebbinghausa-zapominania-powtorki/">
                    <img src={forgetCurve1} className={"forgetCurve1-img"} alt="forgetting Curve"/>
                </a>
            </div>
        </section>

    )
}