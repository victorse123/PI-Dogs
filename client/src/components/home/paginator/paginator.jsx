import React from "react";
import { paginator, searchBtn, btnIcon, paginationText, activePage } from './paginator.module.css'
import backIcon from '../../../images/backIcon.png';
import forwardIcon from '../../../images/forwardIcon.png';

const Paginator = ({ onPageSelect, currentPage, numPages }) =>{
    let pages = [];
    for (let i = 1; i <= numPages; i++){
        pages.push(i);
    }
    return(
        <div className={paginator}>
            <span className={searchBtn}>
                <img src={backIcon} className={btnIcon} onClick={() => onPageSelect(1)} alt="" />
            </span>
            <small className={paginationText}>{
                pages.map(p => (
                    <span className={currentPage === p ? activePage : ' '} onClick={() =>onPageSelect(p)}>{`${p} `}</span>
                ))
            }</small>
            <span className={searchBtn}>
                <img src={forwardIcon} className={btnIcon} onClick={() => onPageSelect(numPages)} alt="" />
            </span>
        </div>
    );
}

export default Paginator;