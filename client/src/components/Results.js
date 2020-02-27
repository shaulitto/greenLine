import React, { Component } from "react";
import ResultList from "./ResultList";
import SelectDay from "./SelectDay";

export default class Results extends Component {
  state = {
    posts: []
  };

  getData = () => {
    // console.log("getData()");
    // ?from=&to=&select-date=Day
    axios.get("/api/").then(response => {
      this.setState({
        posts: response.data
      });
    });
  };
  render() {
    return (
      <div>
        <SelectDay />
        <ResultList />
      </div>
    );
  }
}
