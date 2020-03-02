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

  render() {
    return (
      <>
        <div key={this.state.detail.id} onClick={this.handleClick}>
          <p>
            From: {this.state.detail.origin.name} at:
            {Date(this.state.detail.legs.departure)}, Platform:
            {this.state.detail.legs[0].departurePlatform}
          </p>
          <p>
            To: {this.state.detail.destination.name} at:
            {Date(this.state.detail.legs.arrival)}
            ,Platform:{this.state.detail.legs[0].arrivalPlatform}
          </p>
          <p>{this.state.detail.legs[0].line.name}</p>
          <p>
            {this.state.detail.price.currency}
            {this.state.detail.price.amount}
          </p>
        </div>
        {this.state.showDetail ? (
          <TripDetail selectedTrip={this.state.detail} />
        ) : (
          <div></div>
        )}
      </>
    );
  }
}

export default ResultList;
