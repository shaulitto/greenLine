import React, { Component } from "react";
import ResultList from "./ResultList";
import ShowDays from "./ShowDays";

export default class Results extends Component {
  state = {
    results: [],
    number: 20
  };

  loadNext = () => {
    this.setState({
      number: this.state.number + 20
    });
  };

  componentDidMount() {
    const mapped = this.props.resultData.map((journey, i) => {
      const obj = {};
      obj.origin = journey.origin;
      obj.destination = journey.destination;
      obj.normalPrice = journey.price.amount;
      obj.firstClass = this.props.firstClass[i]?.price.amount;
      obj.legs = journey.legs;
      obj.id = journey.id;
      return obj;
    });

    const sorted = [...mapped].sort((a, b) => {
      return a.legs[0].departure.localeCompare(b.legs[0].departure);
    });
    console.log("sorted results here", sorted);

    this.setState({
      results: sorted
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props.resultData);
    if (prevProps !== this.props) {
      const mapped = this.props.resultData.map((journey, i) => {
        const obj = {};
        obj.origin = journey.origin;
        obj.destination = journey.destination;
        obj.normalPrice = journey.price.amount;
        obj.firstClass = this.props.firstClass[i]?.price.amount;
        obj.legs = journey.legs;
        obj.id = journey.id;
        return obj;
      });
      const sorted = [...mapped].sort((a, b) => {
        return a.legs[0].departure.localeCompare(b.legs[0].departure);
      });

      this.setState({
        results: sorted
      });
    }
  }

  sortByPrice = () => {
    const priced = [...this.state.results].sort((a, b) => {
      return a.normalPrice - b.normalPrice;
    });
    this.setState({
      results: priced
    });
  };

  sortByTime = () => {
    const timed = [...this.state.results].sort((a, b) => {
      return a.legs[0].departure.localeCompare(b.legs[0].departure);
    });
    this.setState({
      results: timed
    });
  };

  render() {
    return (
      <div className="ResultsPage">
        <ShowDays />
        <div className="Filter">
          <button onClick={this.sortByPrice}>Sort by Price</button>
          <button onClick={this.sortByTime}>Sort by Time</button>
        </div>
        {/* {console.log(this.state.results.length)} */}
        {this.state.results.slice(0, this.state.number).map(el => (
          <ResultList detail={el} key={el.id} />
        ))}
        <button onClick={this.loadNext}>Load More</button>
      </div>
    );
  }
}
