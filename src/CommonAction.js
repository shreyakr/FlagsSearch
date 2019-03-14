import CommonApi from "./api/CommonApi";

export function ContinentAutoSuggestion(searchData) {
    return function(dispatch) {
        return CommonApi.ContinentAutoSuggestionApi(searchData)
            .then(response => {
                dispatch({
                    type: "GET_CONTINENT_LIST",
                    payload: response,
                });
            })
            .catch(error => {
                throw error;
            });
    };
}

export function getSuggestionValue(value) {
    return { type: "GET_CONTINENT", value };
}

export function CountryAutoSuggestion(searchData,countryList) {
    return function(dispatch) {
        return CommonApi.CountryAutoSuggestionApi(searchData)
            .then(response => {
                dispatch({
                    type: "GET_COUNTRY_LIST",
                    countryList:countryList,
                    payload: response,
                });
            })
            .catch(error => {
                throw error;
            });
    };
}

export function getCountryFlag(flag){
    return { type: "GET_FLAG", flag };
}
export function getSuggestionCountryValue(value){
    return { type: "GET_COUNTRY", value };
}