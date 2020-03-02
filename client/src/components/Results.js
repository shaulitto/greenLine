import React, { Component } from "react";
import ResultList from "./ResultList";

export default class Results extends Component {
  state = {
    results: this.props.setTripResults
  };
  render() {
    //console.log(this.props.tripResults);
    return (
      <div>
        {this.props.setTripResults.map(details => {
          return <ResultList details={details} key={details.id} />;
        })}
      </div>
    );
  }
}
