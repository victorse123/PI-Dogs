import React from "react";
import { container, leftPanel, midPanel, profileImg, wrapper, subTitleBox, subTitle, title, weightText, mainBtn } from './breedCard.module.css';
import placeholderImg from '../../../images/profileHolder.png'
import { Link } from "react-router-dom";

const BreedCard = ({breed}) =>{

    let firstTemps = breed.temperament ? breed.temperament.replace(' ', '').split(',') : 'Gentle';
    
    return(
        <div className={container}>
            <div className={wrapper}>
                <div className={leftPanel}>
                    <img src={breed.img.includes('undefine') ? placeholderImg : breed.img} alt="" className={profileImg} />
                </div>
                <div className={midPanel}>
                    <div className={subTitleBox}>
                        <h5 className={subTitle}>{
                            firstTemps === 'Gentle'?
                            'Gentle' :
                            `${firstTemps[0]}, ${firstTemps[1]}, ${firstTemps[2]}`
                        }</h5>
                    </div>
                    <div>
                        <h2 className={title}>{breed.name}</h2>
                    </div>
                    <div>
                        <h2 className={weightText}>({breed.weight}kg.)</h2>
                    </div>
                    <div>
                        <Link to={`/breed/${breed.id}`} className={mainBtn}>LEARN MORE</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BreedCard;