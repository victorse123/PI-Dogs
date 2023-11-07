import {
    GET_ALL_BREEDS,
    GET_BREED_BY_NAME,
    GET_BREED_BY_ID,
    GET_TEMPS,
    CREATE_BREED,
    FILTER_BREEDS_BY_TEMP,
    FILTER_BREEDS_BY_SOURCE,
    SORT_BREEDS_BY_AZ,
    SORT_BREEDS_BY_WEIGHT,
    SET_CHOSEN_FIVE,
    CLEAR_FILTERS
} from '../actions';

const initialState = {
    breeds: [],
    results: [],
    invBreed: [],
    temps: [],
    chosenFive: [],
    temp: null,
    source: null,
    keyword: null,
    wSort: 'wu',
    nSort: 'az'
}

const rootReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_ALL_BREEDS:
            return{
                ...state,
                breeds: action.payload,
                results: action.payload
            }

        case GET_BREED_BY_NAME:
            return{
                ...state,
                results: action.payload[0],
                keyword: action.payload[1]
            }
        
        case GET_BREED_BY_ID:
            return{
                ...state,
                invBreed: action.payload
            }
        
        case GET_TEMPS:
            return{
                ...state,
                temps: action.payload
            }
        
        case CREATE_BREED:
            return{
                ...state,
                invBreed: action.payload
            }
        
        case FILTER_BREEDS_BY_TEMP:
            let filteredBreeds = state.breeds;
            if (state.keyword) filteredBreeds = filteredBreeds.filter(b => b.name.includes(state.keyword.charAt(0).toUpperCase() + state.keyword.slice(1)));
            filteredBreeds = filteredBreeds.filter(b => {
                if (!b.temperament) return false;
                return b.temperament.includes(action.payload)
            });
            if (state.source) {
                filteredBreeds = filteredBreeds.filter(b =>{
                    if (state.source === 'DB') return b.id.toString().includes('DB');
                    else return !b.id.toString().includes('DB');
                });
            }
            return{
                ...state,
                results: filteredBreeds,
                temp: action.payload
            }

        case FILTER_BREEDS_BY_SOURCE:
            let filteredBreedz = state.breeds;
            if (state.keyword) filteredBreedz = filteredBreedz.filter(b => b.name.includes(state.keyword.charAt(0).toUpperCase() + state.keyword.slice(1)));
            filteredBreedz = filteredBreedz.filter(b => {
                if (action.payload === 'DB') return b.id.toString().includes('DB');
                else return !b.id.toString().includes('DB');
            });
            if (state.temp) {
                filteredBreedz = filteredBreedz.filter(b =>{
                    if (!b.temperament) return false;
                    return b.temperament.includes(state.temp)
                });
            }
            return{
                ...state,
                results: filteredBreedz,
                source: action.payload
            }

        case SORT_BREEDS_BY_AZ:
            let sortedBreeds = action.payload === 'az' ?
                state.results.slice().sort((a, b) =>{
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                }):
                state.results.slice().sort((a, b) =>{
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                });
            return{
                ...state,
                results: sortedBreeds,
                nSort: action.payload
            }
        
        case SORT_BREEDS_BY_WEIGHT:
            const sortedBreedz = action.payload === 'wu' ?
                state.results.slice().sort((a, b) =>{
                    let aW = a.weight.replaceAll(" ", "").split("-");
                    let bW = b.weight.replaceAll(" ", "").split("-");
                    return bW[0] - aW[0];
                }):
                state.results.slice().sort((a, b) =>{
                    let aW = a.weight.replaceAll(" ", "").split("-");
                    let bW = b.weight.replaceAll(" ", "").split("-");
                    return aW[0] - bW[0];
                });
            return{
                ...state,
                results: sortedBreedz,
                wSort: action.payload
            }

        case SET_CHOSEN_FIVE:
            return{
                ...state,
                chosenFive: action.payload
            }
        
        case CLEAR_FILTERS:
            return{
                ...state,
                temp: null,
                source: null,
                keyword: null
            }
    
        default:
            return state;
    }
}

export default rootReducer;