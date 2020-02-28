import React, { Component } from "react";
import ResultList from "./ResultList";

export default class Results extends Component {
  state = {
    results: this.props.tripResults
  };
  render() {
    //console.log(this.props.tripResults);
    return (
      <div>
        {this.state.results.map(details => {
          return <ResultList details={details} />;
        })}
      </div>
    );
  }
}
