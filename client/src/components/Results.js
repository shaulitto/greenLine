import React, { Component } from "react";
import ResultList from "./ResultList";

export default class Results extends Component {
  state = {
    results: this.props.resultData,
    firstClass: this.props.firstClass
  };
  render() {
    const map = this.state.results.map((journey, i) => {
      const obj = {};
      obj.origin = journey.origin;
      obj.destination = journey.destination;
      obj.normalPrice = journey.price.amount;
      obj.firstClass = this.state.firstClass[i]?.price.amount;
      obj.legs = journey.legs;
      obj.id = journey.id;
      console.log("object", obj);
      return obj;
    });
    // console.log(map);
    return (
      <div>
        {map.map(el => (
          <ResultList details={el} key={el.id} />
        ))}
      </div>
    );
  }
}
