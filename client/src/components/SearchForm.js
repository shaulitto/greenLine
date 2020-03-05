import React, { Component } from "react";
import axios from "axios";
import Autocomplete from "./Autocomplete";
import Results from "./Results";
import { Link } from "react-router-dom";
import ShowDays from "./ShowDays";

Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 16);
};

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
    savedJourney: [],
    resultData: [],
    firstClass: []
  };

  handleChange = e => {
    const date = e.target.value;
    // console.log(date);
    this.setState({
      date: date
    });
  };

  searchPrice = state => {
    this.setState({
      resultData: []
    });

    let newFromId = state.fromId;
    if (!newFromId) newFromId = state.from;

    let newToId = state.toId;
    //let date;
    if (!newToId) newToId = state.to;
    // date = new Date("2020-03-14T17:07:06");
    // const copy = new Date(Number(date));
    // copy.setDate(date.getDate() - 10);
    // console.log(copy);
    // for (let i = 0; i < 4; i++) {
    //   switch (i) {
    //     case 0:
    //       date = state.date.slice(8, 10);
    //     case 1:
    //     //Statements executed when the
    //     //result of expression matches value2

    //     case 2:
    //     //Statements executed when the
    //     //result of expression matches valueN

    //     default:
    //     //Statements executed when none of
    //     //the values match the value of the expression
    //   }
    // }
    const getPrices = axios.get(
      "/api/price?date=" +
        state.date.slice(0, 16) +
        "&fromId=" +
        newFromId +
        "&toId=" +
        newToId
    );
    console.log("date format", state.date.slice(0, 16));

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
    //}
  };

  handleSubmit = event => {
    event.preventDefault();
    this.searchPrice(this.state);
  };

  componentDidMount() {
    if (this.props.location.state) {
      console.log("coming from user", this.props.location.state);
      this.setState({
        from: this.props.location.state.from,
        to: this.props.location.state.to,
        fromId: this.props.location.state.fromId,
        toId: this.props.location.state.toId,
        date: this.props.location.state.date
      });
      console.log("date in component did mount", this.state.date);
      this.searchPrice(this.props.location.state);
      window.history.pushState(null, "");
    }
  }

  getStations = directions => {
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
      .post("/api/journeys", {
        to: this.state.to,
        toId: this.state.toId,
        from: this.state.from,
        fromId: this.state.fromId,
        date: this.state.date.slice(0, 16)
      })
      .then(response => {
        this.setState({
          savedJourney: response.data
        });
        this.props.setFavorites(this.state.savedJourney);
        console.log("journey detail in searchform:", this.state.savedJourney);
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
    //console.log("HI", this.props.location.state);
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
            <img height="16px" src="/swap-vertical.svg" alt="switch" />
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
              <img height="32px" src="/fav.svg" alt="Favourite" />
            </button>
          ) : (
            <Link id="favlink" to="/Login">
              Login to save this trip
            </Link>
          )}
        </div>
        <div></div>

        {this.props.resultListRender ? (
          <div>
            <ShowDays dates={this.state.date} />
            <Results
              isLoggedIn={this.props.isLoggedIn}
              resultData={this.state.resultData}
              firstClass={this.state.firstClass}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default SearchForm;
