import React, { Component } from "react";
import TripDetail from "./TripDetail";

export class ResultList extends Component {
  state = {
    detail: this.props.details,
    showDetail: false
  };

  handleClick = () => {
    this.state.showDetail
      ? this.setState({
          showDetail: false
        })
      : this.setState({
          showDetail: true
        });
  };
  // .toString() // .slice(0, 21)}

  render() {
    const departure = new Date(this.state.detail.legs[0].departure);
    const arrival = new Date(
      this.state.detail.legs[this.state.detail.legs.length - 1].arrival
    );
    const duration = new Date(arrival - departure).toLocaleTimeString();
    return (
      <>
        <div key={this.state.detail.id} onClick={this.handleClick}>
          <p>
            From:
            {this.state.detail.origin.name
              ? this.state.detail.origin.name
              : "There are no results"}
            at:
            {this.state.detail.legs[0].departure.slice(0, 21)}, Platform:
            {this.state.detail.legs[0].departurePlatform}
          </p>
          <p>
            To: {this.state.detail.destination.name} at:
            {this.state.detail.legs[0].arrival.slice(0, 21)}
            ,Platform:{this.state.detail.legs[0].arrivalPlatform}
          </p>
          <p>
            Duration: {duration.slice(0, 2) + "h" + duration.slice(3, 5) + "m"}
          </p>
          <p>Changes: {this.state.detail.legs.length - 1}</p>
          <p>
            First Class:
            {this.state.detail.firstClass
              ? this.state.detail.firstClass
              : "not available"}
          </p>
          <p>
            Second Class:
            {this.state.detail.normalPrice}
          </p>
          <ul>
            {this.state.detail.legs.map(el => {
              return (
                <li
                  key={this.state.detail.id}
                  style={{ border: "1px solid red" }}
                >
                  {el.line.product}
                  {el.line.name}
                </li>
              );
            })}
          </ul>

          {this.state.showDetail ? (
            <TripDetail selectedTrip={this.state.detail} />
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  }
}

export default ResultList;
