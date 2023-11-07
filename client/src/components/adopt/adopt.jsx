import React from "react";
import {
    container,
    subTitleBox,
    subTitle,
    title,
    mainCont,
    leftCont,
    rightCont,
    reverseLeftCont,
    reverseRightCont,
    stepOneStyle,
} from './adopt.module.css'
import stepOne from '../../images/step1.png'
import stepTwo from '../../images/step2.png'
import stepThree from '../../images/step3.png'

const Adopt = () =>{
    return(
        <div className={container}>
            <div className={subTitleBox}>
                <h5 className={subTitle}>READY FOR A LIFELONG COMPANION?</h5>
            </div>
            <div>
                <h2 className={title}>Few Steps For Adopting</h2>
            </div>
            {/* STEP 1 */}
            <section className={mainCont}>
                {/* LEFT PANEL */}
                <div className={reverseLeftCont}>
                    <img className={stepOneStyle} src={stepOne} alt="" />
                </div>

                {/* RIGHT PANEL */}
                <div className={reverseRightCont}>
                    <h2 className={title}>1. Evaluate your lifestayle and find a dog that suits it.</h2>
                </div>
            </section>

            {/* STEP 2 */}
            <section className={mainCont}>
                {/* LEFT PANEL */}
                <div className={leftCont}>
                    <h2 className={title}>2. Contact your local animal shelter or humane society.</h2>
                </div>

                {/* RIGHT PANEL */}
                <div className={rightCont}>
                    <img className={stepOneStyle} src={stepTwo} alt="" />
                </div>
            </section>

            {/* STEP 3 */}
            <section className={mainCont}>
                {/* LEFT PANEL */}
                <div className={reverseLeftCont}>
                    <img className={stepOneStyle} src={stepThree} alt="" />
                </div>

                {/* RIGHT PANEL */}
                <div className={reverseRightCont}>
                    <h2 className={title}>3. Make the necessary changes in your life and house to accommodate your new life companion.</h2>
                </div>
            </section>


        </div>
    );
}

export default Adopt;