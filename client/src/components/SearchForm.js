import React, { Component } from "react";
import axios from "axios";
import Autocomplete from "./Autocomplete";
import Results from "./Results";
import { Link } from "react-router-dom";


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
    id: "",
    resultListRender: false,
    resultData: []
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
    // console.log("look here", event);
    // console.log("searchdate:", this.state.date.slice(0, 16));
    // console.log("TO AND FROM", this.state.from, this.state.to);
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
        // this.props.setTripResults(res.data);
        // this.props.history.push("/results");
        this.setState({
          resultData: res.data,
          resultListRender: true
        });
      });
  };

  getStations = directions => {
    console.log("DIRECTIONS", directions);

    axios
      .post("/cities", {
        to: this.state.to,
        from: this.state.from
      })
      .then(response => {
        if (directions === "to") {
          let newDataTo = response.data.resultTo;
          if (this.state.to === "") newDataTo = [];
          this.setState({
            resultTo: newDataTo
          });
        } else {
          let newDataFrom = response.data.resultFrom;
          if (this.state.from === "") newDataFrom = [];
          this.setState({
            resultFrom: newDataFrom
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



  handleClickSave = event => {
    axios.post("/journeys", {
      to: this.state.to,
      toId: this.state.toId,
      from: this.state.from,
      fromId: this.state.fromId,
      date: this.state.date.slice(0, 16)
    });
    // .then(response => {
    //   this.setState({ journey: response.data });
    // });
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
        {this.props.isLoggedIn ? (
          <button onClick={this.handleClickSave}>
            Save this Trip to your List
          </button>
        ) : (
          <Link to="/Login">Login to save</Link>

        )}
        {this.state.resultListRender ? (
          <Results
            isLogged
            In={this.props.isLoggedIn}
            setTripResults={this.state.resultData}
          />
        ) : (
          <div></div>
        
      </div>
    );
  }
}

export default SearchForm;
