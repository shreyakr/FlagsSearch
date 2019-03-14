export default function commonReducer(state ,action) {
    switch (action.type) {
        case "GET_CONTINENT":
            return { ...state, getvalue: action.value };
        case "GET_CONTINENT_LIST":
        return{...state,List:action.payload}  
        case "GET_COUNTRY_LIST":
        return{...state,CountryList:action.countryList ? action.countryList.countries:[]}    
        case "GET_FLAG":
        return{...state,Flag:action.flag}  
        default:
            return state;
    }
    
}