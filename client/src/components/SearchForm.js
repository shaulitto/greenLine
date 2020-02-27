import React, { Component } from "react";
import axios from "axios";
import Autocomplete from "./Autocomplete";

export class SearchForm extends Component {
  state = {
    from: "",
    to: "",
    when: "",
    class: "",
    travellers: "",
    resultTo: [],
    resultFrom: []
  };

  getStations = direction => {
    axios.get("/stations").then(response => {
      let filtered = response.data.filter(el => {
        return el.name
          .toLowerCase()
          .includes(this.state[direction].toLowerCase());
      });

      if (direction === "to") {
        this.setState({
          resultTo: filtered
        });
      } else {
        this.setState({
          resultFrom: filtered
        });
      }
    });
  };

  handleInputChange = direction => {
    let target = direction.target.name;
    this.setState(
      {
        [direction.target.name]: direction.target.value
      },
      () => {
        this.getStations(target);
      }
    );
  };

  updateFrom = text => {
    this.setState({
      from: text,
      resultFrom: []
    });
  };

  updateTo = text => {
    this.setState({
      to: text,
      resultTo: []
    });
  };

  submit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form>
          <label htmlFor="From">From</label>
          <Autocomplete
            name="from"
            id="from"
            handleInputChange={this.handleInputChange}
            updateText={this.updateFrom}
            results={this.state.resultFrom}
            value={this.state.from}
          />
          <button>switch</button>
          <label htmlFor="To">To</label>

          <Autocomplete
            name="to"
            id="to"
            handleInputChange={this.handleInputChange}
            updateText={this.updateTo}
            results={this.state.resultTo}
            value={this.state.to}
          />
          <label htmlFor="Date">Date </label>
          <input type="datetime-local" />
          <select>
            <option value="E">Adults</option>
            <option value="K">Children</option>
            <option value="B">Baby</option>
          </select>
          <button onClick={this.submit}>Search</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
