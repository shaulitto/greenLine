import React, { Component } from "react";
import axios from "axios";
import Autocomplete from "./Autocomplete";

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
    // date: this.state.date
    // let date = this.state.date.slice(0, 16);
    console.log("searchdate:", this.state.date.slice(0, 16));
    console.log(this.state.toId, this.state.fromId);
    // axios
    //   .post("/api/price", { date: this.state.date.slice(0, 16) })
    //   .then(res => {
    //     console.log("RESPONSE:", res);
    //   });
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

  updateText = (text, id) => {
    this.setState({
      from: text,
      fromId: id,
      resultFrom: []
    });
  };

  updateTo = (text, id) => {
    console.log(text);
    console.log(id);
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
          <Autocomplete
            name="from"
            id="from"
            handleInputChange={this.handleInputChange}
            updateText={this.updateText}
            results={this.state.resultFrom}
            value={this.state.from}
          />
          {/* <button >switch</button> */}
          <label htmlFor="To">To</label>

          <Autocomplete
            name="to"
            id={this.state.toId}
            handleInputChange={this.handleInputChange}
            updateText={this.updateTo}
            results={this.state.resultTo}
            value={this.state.to}
          />
          <label htmlFor="Date">Date </label>
          <input
            type="datetime-local"
            // type="date"
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
          <button type="submit">Search</button>
          {/* <button onClick={this.submit}>Search</button> */}
        </form>
      </div>
    );
  }
}

export default SearchForm;
