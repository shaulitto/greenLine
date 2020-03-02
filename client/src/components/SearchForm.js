import React, { Component } from "react";
import axios from "axios";
import Autocomplete from "./Autocomplete";
import { debounce } from "lodash";

export class SearchForm extends Component {
  state = {
    date: new Date(),
    from: "",
    to: "",
    toId: "",
    fromId: "",
    class: "",
    travelers: "",
    resultTo: [],
    resultFrom: [],
    id: ""
  };

  // debounceEvent(...args) {
  //   console.log(...args);
  //   this.debouncedEvent = debounce(...args);
  //   return e => {
  //     e.persist();
  //     return this.debouncedEvent(e);
  //   };
  // }

  handleChange = e => {
    console.log(e.target);

    const date = e.target.value;
    const stringDate = new Date(date).toISOString().slice(0, -1);
    this.setState({
      date: stringDate
    });
    // console.log(this.state.date);
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log("searchdate:", this.state.date.slice(0, 16));
    // console.log("TO AND FROM", this.state.fromId, this.state.toId);

    axios
      .get(
        "/api/price?date=" +
          this.state.date.slice(0, 16) +
          "&fromId=" +
          this.state.fromId +
          "&toId=" +
          this.state.toId
      )
      .then(res => {
        console.log("RESPONSE:", res.data);
        this.props.setTripResults(res.data);
        this.props.history.push("/results");
      });
  };

  getStations = directions => {
    axios
      .post("/cities", { to: this.state.to, from: this.state.from })
      .then(response => {
        if (directions === "to") {
          this.setState({
            resultTo: response.data.resultTo
          });
        } else {
          this.setState({
            resultFrom: response.data.resultFrom
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

  updateText = (text, id) => {
    this.setState({
      from: text,
      fromId: id,
      resultFrom: []
    });
  };

  updateTo = (text, id) => {
    this.setState({
      to: text,
      toId: id,
      resultTo: []
    });
  };

  submit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="From">From</label>
          <Autocomplete
            name="from"
            id="from"
            updateText={this.updateText}
            results={this.state.resultFrom}
            value={this.state.from}
            onChange={this.handleInputChange}
          />
          {/* <button >switch</button> */}
          <label htmlFor="To">To</label>

          <Autocomplete
            name="to"
            id={this.state.toId}
            updateText={this.updateTo}
            results={this.state.resultTo}
            value={this.state.to}
            onChange={this.handleInputChange}
          />

          <label htmlFor="Date">Date </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />

          <select>
            <option value="E">Adults</option>
            <option value="K">Children</option>
            <option value="B">Baby</option>
          </select>
          {/* <Link to="/results"> */}
          <button type="submit">Search</button>
          {/* </Link> */}
          {/* <button onClick={this.submit}>Search</button> */}
        </form>
      </div>
    );
  }
}

export default SearchForm;
