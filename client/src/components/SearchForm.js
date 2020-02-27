import React, { Component } from "react";
import axios from "axios";

export class SearchForm extends Component {
  state = {
    from: "",
    to: ""
  };
  render() {
    return (
      <div>
        <form>
          <label htmlFor="From">From</label>
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
          </select>
        </form>
      </div>
    );
  }
}

export default SearchForm;
