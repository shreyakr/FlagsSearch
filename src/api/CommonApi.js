class CommonApi {
     static ContinentAutoSuggestionApi(searchData) {
        let apiPath = "../json/commonList.json";
        return fetch(apiPath, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            });
    }
    static CountryAutoSuggestionApi(searchData) {
        let apiPath = "../json/commonList.json";
        return fetch(apiPath, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            });
    }
    
}
export default CommonApi;