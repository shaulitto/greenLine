import React, { Component } from "react";

export default class TripDetail extends Component {
  state = {
    trip: this.props.selectedTrip
  };

  onlyHour = timeString => timeString.slice(11, 16);

  convert = (str1, str2) => {
    let departure = new Date(str1);
    let arrival = new Date(str2);
    return new Date(+arrival - +departure).toLocaleTimeString().slice(0, 4);
  };

  render() {
    //Date(this.state.detail.legs.departure)
    //new Date(+arrival - +departure).toLocaleTimeString();
    return (
      <div>
        {this.state.trip.legs.map((leg, index) => {
          return (
            <>
              <p>
                {this.onlyHour(leg.departure)} {leg.origin.name} Platfrom:
                {leg.departurePlatform}
                =>
                {this.onlyHour(leg.arrival)} {leg.destination.name} Platfrom:
                {leg.arrivalPlatform}
                Duration: {this.convert(leg.departure, leg.arrival)} |train:
                {leg.line.name}|
                {this.state.trip.legs[index + 1] &&
                  `Transfer Time:
                  ${this.convert(
                    leg.arrival,
                    this.state.trip.legs[index + 1].departure
                  )}`}
              </p>
            </>
          );
        })}
      </div>
    );
  }
  /* <div>
{/* this.props.setTripResults.map(details => {
  return <ResultList details={details} key={details.id} />;
})}
</div>
Shows journey legs ( time, station names between two single connections in a given journey).
Duration, platform number, train number, transfer time, next connection for each leg */
}
