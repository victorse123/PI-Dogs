import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoDog from "../noDog/noDog";
import BreedCard from "./breedCard/breedCard";
import FilterBar from "./filterBar/filterBar";
import { container } from './home.module.css'
import Paginator from "./paginator/paginator";
import { getAllBreeds } from '../../actions';


const Home = () =>{
    const dispatch = useDispatch();
    let dogBreeds = useSelector(state => state.results);
    
    const [ currentPage, setCurrentPage ] = useState(1);
    const resultsPerPage = 8;
    const resultsEnd = currentPage * resultsPerPage;// 22*8 = 176
    const resultsStart = resultsEnd - resultsPerPage;//176-8 = 168
    const results =  !dogBreeds.error ? dogBreeds.slice(resultsStart, resultsEnd): null

    useEffect(() =>{
        dispatch(getAllBreeds());
    }, [dispatch]);

    const onPageSelect = page => setCurrentPage(page);

    return(
        <>
            <div className={container}>
                <FilterBar/>
                {
                    dogBreeds.length > 0 && !dogBreeds.error ?
                    results.map(b =>(
                        // <h1>{b.temperament}</h1>
                        <BreedCard key={b.id} breed={b} />
                    )):
                    <NoDog />
                }
                {
                    !dogBreeds.error ?
                    <Paginator onPageSelect={onPageSelect} currentPage={currentPage} numPages={Math.ceil(dogBreeds.length/8)} />
                    : null
                }
            </div>
        </>
    );
}

export default Home;