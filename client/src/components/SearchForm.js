import React, { Component } from "react";
import axios from "axios";

export class SearchForm extends Component {
  state = {
    date: new Date()
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

    axios
      .post("/api/price", { date: this.state.date.slice(0, 16) })
      .then(res => {
        console.log("RESPONSE:", res);
      });
  };

  render() {
    console.log(this.state.date);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* <label htmlFor="From">From</label>
          <input name="from" id="from" value="" onChange="" />
          <button>switch</button>
          <label htmlFor="To">To</label>
          <input name="to" id="to" value="" onChange="" />
          <label htmlFor="Date">Date </label>
          <select name="select-date">
            <option value="Day">
              Day <input type="date" />
            </option>
            <option value="Month">Month</option>
          </select> */}
          <label htmlFor="Date">Date </label>
          <input
            type="datetime-local"
            // type="date"
            id="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
          {/* <input
            id="content"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          /> */}

          <button type="submit">Submit, Menna!</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
