import React, { Component } from 'react';
import {CheckedSelect} from 'react-select-checked';
class CountrySelect extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentSelection:[]
      };
    }
    logChange=(val)=> {

        this.setState(
            {
                currentSelection: val
            },
            () => {
              this.props.getCountryFlag(this.state.currentSelection);
            }
        );
      }
    render() {
        return (
            <CheckedSelect
                    name="form-field-name"
                    value={this.state.currentSelection}
                    options={this.props.autoSuggestionList}
                    onChange={this.logChange}
                  />
        )
    }
}
export default CountrySelect;