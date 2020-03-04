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
    // console.log(this.state.detail);
    const departure = new Date(this.state.detail.legs[0].departure);
    const arrival = new Date(
      this.state.detail.legs[this.state.detail.legs.length - 1].arrival
    );
    const duration = new Date(arrival - departure).toLocaleTimeString();
    return (
      <>
        <div key={this.state.detail.id} onClick={this.handleClick}>
          <p>
            at:
            {this.state.detail.legs[0].departure.slice(11, 16)}
            From: {this.state.detail.origin.name} Platform:
            {this.state.detail.legs[0].departurePlatform}
          </p>
          <p>
            at:
            {this.state.detail.legs[0].arrival.slice(11, 16)}
            To: {this.state.detail.destination.name}
            Platform:{this.state.detail.legs[0].arrivalPlatform}
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
            0 €
          </p>
          <p>
            Second Class:
            {this.state.detail.normalPrice} €
          </p>
          <ul>
            {this.state.detail.legs.map((el, i) => {
              return (
                <li key={i} style={{ border: "1px solid red" }}>
                  {el.line.product}
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
