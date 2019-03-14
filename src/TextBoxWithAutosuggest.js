import React from "react";
import { Row } from "react-bootstrap";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";


class TextBoxAutoSuggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            placeholder: this.props.placeholder,
            fetchObject: this.props.fetchObject,
            autoSuggestionList: this.props.autoSuggestionList,
            hasError: this.props.hasError,
            errorMsg: this.props.errorMsg,
            tooltipTitle: this.props.tooltipTitle,
            //addBtnText: this.props.addBtnText,
            suggestionColValue: this.props.suggestionColValue,
            inputValue: this.props.inputValue,
            suggestions: []
        };
        this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            autoSuggestionList: nextProps.autoSuggestionList,
            hasError: nextProps.hasError,
            errorMsg: nextProps.errorMsg,
            inputValue: nextProps.inputValue
        });
    }
    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    getSuggestions(value) {
        const escapedValue = this.escapeRegexCharacters(value.trim());
        if (escapedValue === "") {
            return [];
        }
        const regex = new RegExp("\\b" + escapedValue, "i");
        return this.state.autoSuggestionList.filter(item =>
            regex.test(this.getSuggestionValue(item))
        );
        
    }
    getSuggestionValue(suggestion) {
       this.props.getSuggestionValue(suggestion);
        //return suggestion;
        let returnValue = "";
        if (this.props.autoSuggestionList) {
            let fetchSuggestion = suggestion;
            let fetchArr = this.props.autoSuggestionList;
            for (var i = 0; i < fetchArr.length; i++) {
                if (fetchArr[i].length) {
                    fetchSuggestion = fetchSuggestion[fetchArr[i]];
                }
            }
            returnValue = fetchSuggestion.continent ? fetchSuggestion.continent : fetchSuggestion;
        } else {
            returnValue = suggestion.continent ? suggestion.continent : suggestion;
        }
        return returnValue;
    }
    renderSuggestion(suggestion, { query }) {
       // const matches = AutosuggestHighlightMatch(suggestion, query);
       // const parts = AutosuggestHighlightParse(suggestion, matches);
        let suggestionText = "";
        if (this.props.autoSuggestionList) {
            let fetchSuggestion = suggestion;
            let fetchArr = this.props.autoSuggestionList;
            for (var i = 0; i < fetchArr.length; i++) {
                if (fetchArr[i].length) {
                    fetchSuggestion = fetchSuggestion[fetchArr[i]];
                }
            }
            suggestionText = fetchSuggestion.continent ? fetchSuggestion.continent : fetchSuggestion;
        } else {
            suggestionText = suggestion.continent ? suggestion.continent : suggestion;
        }
        const matches = AutosuggestHighlightMatch(suggestionText, query);
        const parts = AutosuggestHighlightParse(suggestionText, matches);

        return (
            <span className={"suggestion-content " + suggestion.twitter}>
                <span className="name">
                    {parts.map((part, index) => {
                        const className = part.highlight ? "highlight" : null;

                        return (
                            <span className={className} key={index}>
                                {part.text}
                            </span>
                        );
                    })}
                </span>
            </span>
        );
    }
    onSuggestionsFetchRequested({ value }) {
        /*this.setState({
            suggestions: this.getSuggestions(value)
        });*/
    }
    onSuggestionsClearRequested() {
        this.setState({
            autoSuggestionList: []
        });
    }
    onInputChange(event, { newValue }) {
        this.setState({
            inputValue: newValue
        });
        this.props.onInputChange(newValue);
    }
    onSuccess() {
        this.props.onSuccess(this.state.inputValue);
    }
    render() {
        const { inputValue, autoSuggestionList } = this.state;
        const inputProps = {
            placeholder: this.state.placeholder,
            value: inputValue || "",
            onChange: this.onInputChange,
            id: this.state.id,
            className: "input-with-icon" + (this.state.hasError ? " errorClass" : "")
        };
        return (
            <Row className="textboxautosuggest-component">
                <div
                    className={
                        "react-autosuggest__wrapper textwithtooltip " +
                        (this.state.suggestionColValue
                            ? this.state.suggestionColValue
                            : "col-lg-9 col-md-9 col-sm-9 col-xs-10") +
                        (this.state.suggestionColValue ? " aligninputFeild" : "")
                    }>
                    <Autosuggest
                        suggestions={autoSuggestionList || []}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                    />
                </div>
            </Row>
        );
    }
}

export default TextBoxAutoSuggest;
