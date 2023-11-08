import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { container, filterItem, textInput, searchBtn, btnCont, btnIcon } from './filterBar.module.css';
import searchIcon from '../../../images/search.png';
import weightUp from '../../../images/sort_weight_up.png';
import weightDown from '../../../images/sort_weight_down.png';
import azUp from '../../../images/az_up.png';
import azDown from '../../../images/az_down.png';
import addIcon from '../../../images/addIcon.png';
import clearIcon from '../../../images/removeIcon.png'
import {
    getTemps,
    filterBreedsByTemp,
    filterBreedsBySource,
    getAllBreeds,
    clearFilters,
    getBreedByName,
    sortBreedsByAz,
    sortBreedsByWeight
} from "../../../actions";

const FilterBar = () =>{
    const dispatch = useDispatch();
    const [temp, setTemp] = useState('');
    const [source, setSource] = useState('');
    const [search, setSearch] = useState('');

    let searchKey = useSelector(state => state.keyword);
    let temps = useSelector(state => state.temps);
    let wSort = useSelector(state => state.wSort);
    let nSort = useSelector(state => state.nSort);
    useEffect(() =>{
        dispatch(getTemps());
        if (searchKey) setSearch(searchKey);
    }, [dispatch]);

    const tempChangeHandler = e =>{
        dispatch(filterBreedsByTemp(e.target.value));
        setTemp(e.target.value);
    }

    const sourceChangeHandler = e =>{
        dispatch(filterBreedsBySource(e.target.value));
        setSource(e.target.value);
    }
    const onClearFilters = () =>{
        setTemp('');
        setSource('');
        setSearch('');
        dispatch(clearFilters());
        dispatch(getAllBreeds());
    }
    const onChangeSearchInput = e =>{
        setSearch(e.target.value);
    }
    const searchHandler = () =>{
        dispatch(getBreedByName(search));
    }
    const sortHelper = (sort, dir) =>{
        console.log(sort, dir);
        if (sort === 'name') dispatch(sortBreedsByAz(dir));
        else dispatch(sortBreedsByWeight(dir));
    
    }
    return(
        <form onSubmit={e =>{ e.preventDefault(); searchHandler();}} className={container}>
            <div className={filterItem}>
                <select name="temp" className={textInput} onChange={tempChangeHandler} value={temp}>
                    <option defaultValue>Select Temperament</option>
                    {
                    temps.length > 0 ?
                    temps.map(t => (
                            <option  key={t.name} value={t.name}>{t.name}</option>
                        )): null
                    }
                </select>
            </div>

            <div className={filterItem}>  
                <select name="source" className={textInput} onChange={sourceChangeHandler} value={source}>
                    <option defaultValue>Select Source</option>
                    <option value='API'>API</option>
                    <option value='DB'>Data Base</option>
                </select>
            </div>

            <div className={filterItem}>
                <input type="text" name="searchBreed" className={textInput} placeholder={'Breed Name'} value={search} onChange={onChangeSearchInput}/>   
            </div>
            <div className={btnCont}>
                <span className={searchBtn}>
                    <img src={searchIcon} className={btnIcon} alt="" onClick={searchHandler} />
                </span>

                <span className={searchBtn}>
                    <img src={clearIcon} className={btnIcon} alt="" onClick={onClearFilters} />
                </span>

                {/* ICON SHOULD CHANGE DEPENDING ON THE SORTING */}
                <span className={searchBtn}>
                    {
                        wSort === 'wu'?
                        <img src={weightDown} className={btnIcon} alt="" onClick={() => sortHelper('weight', 'wd')} />:
                        <img src={weightUp} className={btnIcon} alt="" onClick={() => sortHelper('weight', 'wu')} />
                    }
                </span>
                <span className={searchBtn}>
                    {
                        nSort === 'az'?
                        <img src={azUp} className={btnIcon} alt="" onClick={() => sortHelper('name', 'za')} />:
                        <img src={azDown} className={btnIcon} alt="" onClick={() => sortHelper('name', 'az')} />
                    }
                </span>
                <Link to='/create' className={searchBtn}>
                    <img src={addIcon} className={btnIcon} alt="" />
                </Link>
            </div>
        </form>
    );
}

export default FilterBar;