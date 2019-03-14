import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './App.css';
import TextBoxWithAutosuggest from './TextBoxWithAutosuggest'
import TextBoxAutoSuggestWithCheckbox from './TextBoxAutoSuggestWithCheckbox'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CountrySelect from './CountrySelect'
import  * as commonAction from './CommonAction'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ContinentValue:"",
      CountryValue:"",
      currentSelection:"",
      countryList :this.props.getContinentList ? this.props.getContinentList:"",
      autoSuggestionList:this.props.getContinentList ? this.props.getContinentList :""
    };
  }
  onContinentChange = inputValue => {
   
    this.setState(
      {
        ContinentValue: inputValue || ""
      },
      () => {
        this.props.ContinentAutoSuggestion(inputValue);
      }
  );
};
onCountryChange = inputValue => {
   
  this.setState(
    {
      CountryValue: inputValue || ""
    },
    () => {
      this.props.CountryAutoSuggestion(inputValue,this.props.getsuggestionvalue);
    }
);
};

getSuggestionValue=(value)=>{
  this.setState(
    {
      ContinentValue:""
    },
    () => {
      this.props.getSuggestionValue(value);
    }
);
}

getSuggestionCountryValue=(value)=>{
  this.setState(
    {
      CountryValue:""
    },
    () => {
      this.props.getSuggestionCountryValue(value);
    }
);
}
getCountryFlag=(flag)=>{
 this.props.getCountryFlag(flag)
}
  render() {
    console.log()
    var suggestionColValue = "col-lg-8 col-md-8 col-sm-8 col-xs-8";
    var autosuggestSearch = { marginBottom: "12px" };
    return (
      <div className="App container">
        <Col lg={12} sm={12} md={12} xs={12} className="FlagTitle">Flag picker</Col>
        <Col lg={12} sm={12} md={12} xs={12} className = "stepsParent">
              <Col lg={3} sm={3} md={3} xs={12}>
              <div className="Steps">Step 1</div>
              <div className="titles">Select a contient.</div>
              <TextBoxWithAutosuggest
                      id="Continent"
                      placeholder="Continent"
                      hasError={""}
                      errorMsg={""}
                      autoSuggestionList={this.props.getContinentList ? this.props.getContinentList.details:""}
                      fetchObject="tag"
                      onSuccess={this.onAddTag}
                      onInputChange={this.onContinentChange}
                      inputValue={this.state.ContinentValue}
                      suggestionColValue={suggestionColValue}
                      autosuggestSearch={autosuggestSearch}
                      getSuggestionValue={this.getSuggestionValue}
                  />
                  {this.props.getsuggestionvalue?(<div className ="titles">You selected</div>):""}
                  <span>{this.props.getsuggestionvalue ? this.props.getsuggestionvalue.continent:""}</span>
              </Col>
              <Col lg={1} sm={1} md={1} xs={12}/>
              {this.props.getsuggestionvalue?(
              <Col lg={3} sm={3} md={3} xs={12}>
              <div className="Steps">Step 2</div>
              <div className="titles">Select a Country.</div>
                  <CountrySelect getCountryFlag ={this.getCountryFlag} autoSuggestionList={this.props.getsuggestionvalue ? this.props.getsuggestionvalue.countries:""}/>
              </Col>
        ) :""}
        <Col lg={1} sm={1} md={1} xs={12}/>
         {this.props.getFlag?(<Col lg={3} sm={3} md={1} xs={12}> 
         <div className="Steps">Step 3</div>
              <div className="titles">Selected Flag.</div>
                 {this.props.getFlag ? this.props.getFlag.map((flag, index) => (
                            <div className = "flagtag" key={index}>
                                {flag.label}-{flag.value}
                            </div>
                 )):""}
         </Col>):""} 
        </Col>
        
        
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
     getsuggestionvalue: state ? state.getvalue:"",
     getContinentList: state ? state.List:"",
     getCountryList:state ? state.CountryList:"",
     getFlag:state ? state.Flag:""
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, commonAction), dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
