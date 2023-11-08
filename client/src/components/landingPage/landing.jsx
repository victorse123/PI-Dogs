import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import trendBar from './trendBar/trendBar';
import { container, subTitleBox, subTitle, title, mainBtn, rightCont, mainBanner, leftCont } from './landing.module.css'
import huskyImg from '../../images/huskyclean.png'
import { getAllBreeds } from "../../actions";

const Landing = () =>{
    const dispatch = useDispatch();
    let dogBreeds = useSelector(state => state.breeds);

    useEffect(() =>{
        dispatch(getAllBreeds());
    }, [dispatch]);

    const test = () =>{
        console.log(dogBreeds);
    }
    return(
        <>
            <div className={container}>
                {/* LEFT PANEL */}
                <div className={leftCont}>
                    <div className={subTitleBox}>
                        <h5 className={subTitle}>Charlie Chaplin</h5>
                    </div>
                    <h2 className={title} onClick={test}>"Who feeds a hungry animal, feeds his own soul."</h2>
                    <Link to='/home' className={mainBtn}>SEARCH BREEDS</Link>
                </div>

                {/* RIGHT PANEL */}
                <div className={rightCont}>
                    <img className={mainBanner} src={huskyImg} alt="" />
                </div>
            </div>
            {/* <TrendBar /> */}
        </>
    );
}

export default Landing;