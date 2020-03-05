import React, { Component } from "react";

export default class TripDetail extends Component {
  state = {
    trip: this.props.selectedTrip
  };

  onlyHour = timeString => timeString.slice(11, 16);

  convert = (str1, str2) => {
    let departure = new Date(str1);
    let arrival = new Date(str2);
    return new Date(+arrival - +departure).toLocaleTimeString().slice(0, 5);
  };

  render() {
    //Date(this.state.detail.legs.departure)
    //new Date(+arrival - +departure).toLocaleTimeString();
    return (
      <div>
        {this.state.trip.legs.map((leg, index) => {
          return (
            <>
              <div>
                <div className="legContainer">
                  <div className="legdetail">
                    <span className="times">
                      {this.onlyHour(leg.departure)} &nbsp;
                    </span>
                    <span className="stationName">
                      {leg.origin.name} &nbsp;
                    </span>{" "}
                    <span className="PlatformName">
                      Platfrom: {leg.departurePlatform}
                    </span>
                    <br />
                  </div>
                  <div className="InfoContainer">
                    <p className="Duration">
                      <img height="16px" src="/time.svg" alt="duration" />
                      {this.convert(leg.departure, leg.arrival)}
                    </p>
                    |
                    <p className="trainproduct">
                      <img height="16px" src="/train.svg" alt="train" />
                      {leg.line.name}
                    </p>
                  </div>
                  <div className="legdetail">
                    <span className="times">
                      {this.onlyHour(leg.arrival)} &nbsp;
                    </span>
                    <span className="stationName">
                      {leg.destination.name} &nbsp;
                    </span>{" "}
                    <span className="PatformName">
                      Platfrom: {leg.arrivalPlatform}
                    </span>
                  </div>
                </div>
              </div>
              <div className="TransferContainer">
                {this.state.trip.legs[index + 1] && (
                  <img height="32px" src="/transfer.svg" alt="transfer" />
                )}
                <p className="Transfertime">
                  {this.state.trip.legs[index + 1] &&
                    `Transfer:
                  ${this.convert(
                    leg.arrival,
                    this.state.trip.legs[index + 1].departure
                  )}`}
                </p>
              </div>
            </>
          );
        })}
        <a href="https://www.bahn.com/en/view/index.shtml">
          <button>Book Now</button>
        </a>
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
