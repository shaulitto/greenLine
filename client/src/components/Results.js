import React, { Component } from "react";
import ResultList from "./ResultList";

export default class Results extends Component {
  state = {
    results: this.props.tripResults,
    firstClass: this.props.firstClass,
    firstPrice: 0
  };
  getResults = el => {
    // console.log("el in get Results", el);
    console.log("FirstPrice Before", this.state.firstPrice);
    this.setState({
      firstPrice: this.state.firstClass.find(found => {
        if (found.id === el.id) {
          console.log("FirstPrice after:", found.price.amount);
          return this.setState({
            firstPrice: found.price.amount
          });
        }
      })
    });
    // console.log("FOUND", found);
  };
  render() {
    console.log("FIRST CLASS IM RESULTS WORKING", this.state.firstClass);
    return (
      <div>
        {this.state.results.map(details => {
          // console.log("DETAILSSS:", details);
          this.getResults(details);
          // console.log("FIRST PRICE", this.state.firstPrice);
          return <ResultList details={details} price={this.state.firstPrice} />;
        })}
      </div>
    );
  }
}
