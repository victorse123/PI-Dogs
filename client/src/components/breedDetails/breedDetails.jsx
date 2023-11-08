import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TrendBar from '../landingPage/trendBar/trendBar'
import { container, leftPanel, rightPanel,subTitleBox, subTitle, title, attText, iconStyle, profileSyle } from './breedDetails.module.css'
import profilePhoto from '../../images/largePlaceholrde.webp'
import weightIcon from '../../images/weightIcon.png'
import heightIcon from '../../images/heightIcon.png'
import lifeIcon from '../../images/lifespanIcon.png'
import tempIcon from '../../images/temperamentIcon.png'
import { getBreedById } from "../../actions";
import NoDog from "../noDog/noDog";

const BreedDetails = () =>{
    const dispatch = useDispatch();
    const { id } = useParams();
    let dogBreed = useSelector(state => state.invBreed);
    useEffect(() =>{
        dispatch(getBreedById(id));
    }, [dispatch]);

    let firstTemps = dogBreed.temperament ? dogBreed.temperament.replace(' ', '').split(',') : 'Gentle';

    return(
        <>
            {
                !dogBreed ? <div className={container}><NoDog/></div> :
                <div className={container}>
                    <div className={leftPanel}>
                        <img src={dogBreed.img && !dogBreed.img.includes('undefined') ? dogBreed.img : profilePhoto} alt="" className={profileSyle} />
                    </div>
                    <div className={rightPanel}>
                        <div className={subTitleBox}>
                            <h5 className={subTitle}>{
                                firstTemps === 'Gentle'?
                                'Gentle' :
                                `${firstTemps[0]}, ${firstTemps[1]}, ${firstTemps[2]}`
                            }</h5>
                        </div>
                        <div>
                            <h2 className={title}>{dogBreed.name}</h2>
                        </div>
                        <div>
                            <h2 className={attText}><img src={weightIcon} className={iconStyle} alt="" />{` ${dogBreed.weight} kg`}</h2>
                        </div>
                        <div>
                            <h2 className={attText}><img src={heightIcon} className={iconStyle} alt="" />{` ${dogBreed.height} cm`}</h2>
                        </div>
                        <div>
                            <h2 className={attText}><img src={lifeIcon} className={iconStyle} alt="" /> {dogBreed.life_span}</h2>
                        </div>
                        <div>
                            <h2 className={attText}><img src={tempIcon} className={iconStyle} alt="" /> {dogBreed.temperament ? dogBreed.temperament : 'Good Boy'}</h2>
                        </div>
                    </div>
                </div>
            }
            {/* <TrendBar/> */}
        </>
    );
}

export default BreedDetails;