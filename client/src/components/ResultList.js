import React, { Component } from "react";
import TripDetail from "./TripDetail";

export class ResultList extends Component {
  state = {
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
    const departure = new Date(this.props.detail.legs[0].departure);
    const arrival = new Date(
      this.props.detail.legs[this.props.detail.legs.length - 1].arrival
    );
    const duration = new Date(arrival - departure).toLocaleTimeString();
    return (
      <>
        <div key={this.props.detail.id} onClick={this.handleClick}>
          <p>


            at:
            {this.props.detail.legs[0].departure.slice(11, 16)}
            From: {this.props.detail.origin.name} Platform:
            {this.props.detail.legs[0].departurePlatform}
          </p>
          <p>
            at:
            {this.props.detail.legs[0].arrival.slice(11, 16)}
            To: {this.props.detail.destination.name}
            Platform:{this.props.detail.legs[0].arrivalPlatform}

          </p>
          <p>
            Duration: {duration.slice(0, 2) + "h" + duration.slice(3, 5) + "m"}
          </p>
          <p>Changes: {this.props.detail.legs.length - 1}</p>
 <p>
            2nd Class:
            {this.props.detail.normalPrice}0 €
          </p>
          <p>
            1st Class:
            {this.props.detail.firstClass
              ? this.props.detail.firstClass
              : "not available"}
            0 €
          </p>
          <ul>
            {this.props.detail.legs.map((el, i) => {
              return (
                <li key={i} style={{ border: "1px solid red" }}>
                  {el.line.product}
                </li>
              );
            })}
          </ul>

          {this.state.showDetail ? (
            <TripDetail selectedTrip={this.props.detail} />
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  }
}

export default ResultList;
