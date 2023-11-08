import React from "react"
import { container, mainCont, reverseLeftCont, stepOneStyle, reverseRightCont, title } from './noDog.module.css';
import noDog from '../../images/noDog.png'

const NoDog = () =>{
    return(
        <div className={container}>
            <section className={mainCont}>
                {/* LEFT PANEL */}
                <div className={reverseLeftCont}>
                    <img className={stepOneStyle} src={noDog} alt="" />
                </div>

                {/* RIGHT PANEL */}
                <div className={reverseRightCont}>
                    <h2 className={title}>We are sorry. No breeds were found!</h2>
                </div>
            </section>
        </div>
    );
}

export default NoDog;