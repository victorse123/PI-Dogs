import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    container,
    titleCont,
    iconCont,
    iconItem,
    superTitle,
    title,
    pawImg,
    thump,
    iconImg,
    iconTitle
} from './trendBar.module.css'
import pawImage from '../../../images/sec.webp'
import defaultIcon from '../../../images/profileHolder.png'
// import { setChosenFive } from "../../../actions";


const TrendBar = () =>{
    const dispatch = useDispatch();
    let dogBreeds = useSelector(state => state.breeds);

    // let chosenFive = useSelector(state => state.chosenFive);
    // useEffect(() =>{
    //     let chosenFivez = [];
    //     for (let i = 0; i < 5; i++) {
    //         chosenFivez.push(Math.floor(Math.random() * 170)+ 1);
    //     }
    //     dispatch(setChosenFive(chosenFivez));
    //     console.log(chosenFivez);
    //     console.log(dogBreeds);
    // }, [dispatch, dogBreeds]);

    const [chosenFivez, setChosenFivez] = useState([]);
    
    useEffect(() =>{
        setChosenFivez([]);
        for (let i = 0; i < 5; i++) {
            setChosenFivez(prevState => [...prevState, Math.floor(Math.random() * 170)+ 1]);
        }
    }, []);

    return(
        <div className={container}>
            <div className={titleCont}>
                <img src={pawImage} className={pawImg} alt="pawpatrol!" />
                <h5 className={superTitle}>TRENDING BREEDS</h5>
                <h2 className={title}>The Furriest Of The Dogwalk</h2>
            </div>
            <div className={iconCont}>
                {(chosenFivez.length > 0 && chosenFivez.map(el => (
                    <div className={iconItem} key={dogBreeds[el].id}>
                        <div className={thump}>
                            <Link to={`/breed/${dogBreeds[el].id}`}>
                                <img src={(dogBreeds[el].img ? dogBreeds[el].img : defaultIcon)} className={iconImg} alt="" />
                            </Link>
                            <h3 className={iconTitle}>{dogBreeds[el].name}</h3>
                        </div>
                    </div>
                )))}
            </div>               
        </div>
    );
}

export default TrendBar;