import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBreed, getTemps } from '../../actions'
import {
    container,
    subTitleBox,
    subTitle,
    title,
    inputCont,
    textInput,
    fromStyle,
    dColCont,
    leftMar,
    rightMar,
    mainBtn,
    mainBtnDisabled,
    btnCont,
    tempCont,
    tempBtn,
    tempsBadges,
    invBadge,
    errorBadge,
    errorCont
} from './breedForm.module.css'

const BreedForm = () =>{
    const dispatch = useDispatch();
    const history = useHistory()
    const temps = useSelector(state => state.temps);
    const [input, setInput] = useState({
        name: '',
        minWeight: '',
        maxWeight: '',
        minHeight: '',
        maxHeight: '',
        minLifeSpan: '',
        maxLifeSpan: '',
        imgUrl: '',
        temperaments: [],
    });
    const [tempInput, setTempInput] = useState('');
    const [inputErrors, setInputErrors] = useState({});
    const [btnDisable, setBtnDisable] = useState(true);
    const [bError, setBError] = useState(null);
    const invBreed = useSelector(state => state.invBreed);

    useEffect(() =>{
        if (temps.length < 1) dispatch(getTemps());
    }, [temps]);

    const addTempHandler = () =>{ 
        let match = false;
        input.temperaments.forEach(t => {
            if (t === tempInput) match = true;
        });
        if (!match) setInput({...input, temperaments: [...input.temperaments, tempInput]});
        setTempInput('');
        setInputErrors(validator(input));
    }

    const onChangeTempHandler = e =>{
        setTempInput(e.target.value);
    }

    const onChangeInputHandler = e =>{
        setInput({...input, [e.target.name]: e.target.value});
        setInputErrors(validator(input));
    }

    const validator = input =>{
        let errors = {};
        if (!input.name) errors.name = 'Name is required';
        else if (input.name.length < 3) errors.name = 'Name must be at least 3 characters';
        else if (input.name.length > 25) errors.name = 'Name must be less than 25 characters';
        if (!input.minWeight) errors.minWeight = 'Min weight is required';
        if (!input.maxWeight) errors.maxWeight = 'Max weight is required';
        if (!input.minHeight) errors.minHeight = 'Min height is required';
        if (!input.maxHeight) errors.maxHeight = 'Max height is required';
        if (!input.minLifeSpan) errors.minLifeSpan = 'Min life span is required';
        if (!input.maxLifeSpan) errors.maxLifeSpan = 'Max life span is required';
        if (Object.keys(errors).length > 0 ) setBtnDisable(true);
        else setBtnDisable(false);
        return errors;
    }
    const removeTempHelper = name =>{
        let newArr = input.temperaments.filter(t => t !== name);
        setInput({...input, temperaments: newArr});
        setInputErrors(validator(input));
    }
    const onSubmitHandler = e =>{
        e.preventDefault();
        if (Object.keys(inputErrors).length > 0 || input.name === '') return;
        dispatch(createBreed(input));
        if (invBreed.error) setBError(invBreed.error);
        else history.push(`/breed/DB${invBreed.id}`);
    }

    return(
        <div className={container}>
            <div className={subTitleBox}>
                <h5 className={subTitle}>SEEN A NEW DOG AROUND?</h5>
            </div>
            <div>
                <h2 className={title}>Ceate A New Breed</h2>
            </div>
            <form onSubmit={onSubmitHandler} className={fromStyle}>
                {/* NAME */}
                <div className={inputCont}>
                    <input type="text" name="name" className={textInput} placeholder={'Name*'} value={input.name} onChange={onChangeInputHandler} />
                </div>
                <div className={errorCont}>
                    {inputErrors.name ? <span className={errorBadge}>{inputErrors.name}*</span> : null}
                </div>

                {/* WIGHT */}
                <div className={dColCont}>
                    <input type="number" name="minWeight" className={textInput + ' ' + rightMar} placeholder={'Min Weight (kg)*'} value={input.minWeight} onChange={onChangeInputHandler} />
                    <input type="number" name="maxWeight" className={textInput + ' ' + leftMar} placeholder={'Max Weight (kg)*'} value={input.maxWeight} onChange={onChangeInputHandler} />
                </div>
                <div className={errorCont}>
                    {inputErrors.minWeight ? <span className={errorBadge}>{inputErrors.minWeight}*</span> : null}
                    {inputErrors.maxWeight ? <span className={errorBadge}>- {inputErrors.maxWeight}*</span> : null}
                </div>

                {/* HEIGHT */}
                <div className={dColCont}>
                    <input type="number" name="minHeight" className={textInput + ' ' + rightMar} placeholder={'Min Height (cm)*'} value={input.minHeight} onChange={onChangeInputHandler} />
                    <input type="number" name="maxHeight" className={textInput + ' ' + leftMar} placeholder={'Max Height (cm)*'} value={input.maxHeight} onChange={onChangeInputHandler} />
                </div>
                <div className={errorCont}>
                    {inputErrors.minHeight ? <span className={errorBadge}>{inputErrors.minHeight}*</span> : null}
                    {inputErrors.maxHeight ? <span className={errorBadge}>- {inputErrors.maxHeight}*</span> : null}
                </div>

                {/* LIFE SPAN */}
                <div className={dColCont}>
                    <input type="number" name="minLifeSpan" className={textInput + ' ' + rightMar} placeholder={'Min Lifespan (yrs)*'} value={input.minLifeSpan} onChange={onChangeInputHandler} />
                    <input type="number" name="maxLifeSpan" className={textInput + ' ' + leftMar} placeholder={'Max Lifespan (yrs)*'} value={input.maxLifeSpan} onChange={onChangeInputHandler} />
                </div>
                <div className={errorCont}>
                    {inputErrors.minLifeSpan ? <span className={errorBadge}>{inputErrors.minLifeSpan}*</span> : null}
                    {inputErrors.maxLifeSpan ? <span className={errorBadge}>- {inputErrors.maxLifeSpan}*</span> : null}
                </div>

                {/* IMG URL */}
                <div className={inputCont}>
                    <input type="text" name="imgUrl" className={textInput} placeholder={'Image URL'} value={input.imgUrl} onChange={onChangeInputHandler} />   
                </div>

                {/* TEMPERAMENTS */}
                <div className={dColCont}>
                    <select name="tempSearch" className={textInput + ' ' + rightMar} value={tempInput} onChange={onChangeTempHandler}>
                        <option defaultValue>Select Temperament</option>
                        {
                            temps.length > 0 ?
                            temps.map(t => (
                                    <option  key={t.name} value={t.name}>{t.name}</option>
                            )): null
                        }
                    </select>
                    <span className={tempBtn + ' ' + leftMar} onClick={addTempHandler}>Add Temperament</span>
                </div>
                <hr />
                <div className={tempCont}>
                    <p className={tempsBadges}>
                        {
                            input.temperaments.length < 1 ?
                            <span className={invBadge}>No temperaments added! </span>:
                            input.temperaments.map(t => (
                                <span key={t} className={invBadge} onClick={() => removeTempHelper(t)}>{t}, </span>
                            ))
                        }
                    </p>
                </div>
                <div className={btnCont}>
                    <button className={btnDisable ? mainBtnDisabled : mainBtn}>CREATE BREED</button>
                </div>
                {/* BACKEND ERRO */}
                <div style={{ marginTop: '10px' }}>
                    {bError ? <span className={errorBadge}>{bError}*</span> : null}
                </div>
            </form>
        </div>
    );
}

export default BreedForm;