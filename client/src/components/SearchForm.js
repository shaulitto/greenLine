import React, { Component } from "react";
import axios from "axios";
import Autocomplete from "./Autocomplete";
import Results from "./Results";
import { Link } from "react-router-dom";

Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 16);
};
console.log(new Date());
export class SearchForm extends Component {
  state = {
    date: new Date().toDateInputValue(),
    from: "",
    to: "",
    toId: "",
    fromId: "",
    class: "",
    travelers: "",
    resultTo: [],
    resultFrom: [],
    id: "",
    savedJourney: {},
    resultData: [],
    firstClass: []
  };

  handleChange = e => {
    // console.log(e.target);
    const date = e.target.value;
    // console.log(date);
    this.setState({
      date: date
    });
  };

  handleSubmit = event => {
    this.setState({
      resultData: []
    });
    event.preventDefault();
    let newFromId = this.state.fromId;
    if (!newFromId) newFromId = this.state.from;

    let newToId = this.state.toId;
    if (!newToId) newToId = this.state.to;

    const getPrices = axios.get(
      "/api/price?date=" +
        this.state.date.slice(0, 16) +
        "&fromId=" +
        newFromId +
        "&toId=" +
        newToId
    );
    // console.log(getPrices);

    const firstPrice = axios.get("/api/firstPrice");
    this.setState(
      {
        resultData: []
      },
      () => {
        Promise.all([getPrices, firstPrice]).then(([allRes, firstClass]) => {
          console.log(allRes.data.length);
          this.setState(
            {
              resultData: allRes.data,
              firstClass: firstClass.data
            },
            () => {
              this.props.resultListSetTrue();
            }
          );
        });
      }
    );
  };

  getStations = directions => {
    // console.log("DIRECTIONS", directions);

    axios
      .post("/cities", { to: this.state.to, from: this.state.from })
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
    axios
      .post("/journeys", {
        to: this.state.to,
        toId: this.state.toId,
        from: this.state.from,
        fromId: this.state.fromId,
        date: this.state.date.slice(0, 16)
      })
      .then(response => {
        console.log(response.data);
        this.setState({ savedJourney: response.data });
      });
  };
  reverseDestinations = () => {
    this.setState({
      to: this.state.from,
      from: this.state.to,
      toId: this.state.fromId,
      fromId: this.state.toId
    });
  };

  render() {
    return (
      <div>
        <div className="Searchform">
          {/* <form onSubmit={this.handleSubmit}> */}
          <label htmlFor="From"></label>
          <Autocomplete
            placeholder="From:"
            name="from"
            id="from"
            updateText={this.updateText}
            results={this.state.resultFrom}
            value={this.state.from}
            onChange={this.handleInputChange}
          />
          <label htmlFor="To"></label>
          <br />
          <button className="ReverseButton" onClick={this.reverseDestinations}>
            <img height="32px" src="/swap-vertical.svg" alt="switch" />
          </button>
          <br />
          <Autocomplete
            placeholder="To:"
            name="to"
            id={this.state.toId}
            updateText={this.updateTo}
            results={this.state.resultTo}
            value={this.state.to}
            onChange={this.handleInputChange}
          />
          <label htmlFor="Date"></label>
          <input
            className="inputDate"
            type="datetime-local"
            id="date"
            name="date"
            value={this.state.date}
            // defaultValue={this.state.date}
            onChange={this.handleChange}
          />
          <br />
          {/* <select>
            <option value="E">Adults</option>
            <option value="K">Children</option>
            <option value="B">Baby</option>
          </select> */}
          <button
            className="SubmitButton"
            type="submit"
            onClick={this.handleSubmit}
          >
            Find Prices
          </button>
          <br />
          {/* </form> */}
          {this.props.isLoggedIn ? (
            <button onClick={this.handleClickSave}>
              Save this Trip to your List
            </button>
          ) : (
            <Link id="favlink" to="/Login">
              Login to save this trip
            </Link>
          )}
        </div>
        {this.props.resultListRender ? (
          <Results
            isLoggedIn={this.props.isLoggedIn}
            resultData={this.state.resultData}
            firstClass={this.state.firstClass}
          />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default SearchForm;
