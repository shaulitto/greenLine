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
        <div
          className="ResultsContainer"
          key={this.props.detail.id}
          onClick={this.handleClick}
        >
          <div className="stationContainer">
            <p>
              <span className="times">
                {this.props.detail.legs[0].departure.slice(11, 16)} &nbsp;
              </span>
              <span className="stationName">
                {this.props.detail.origin.name} &nbsp;
              </span>
              <span className="PlatformName">
                Platform: {this.props.detail.legs[0].departurePlatform}
              </span>
            </p>
            <p>
              <span className="times">
                {this.props.detail.legs[0].arrival.slice(11, 16)} &nbsp;
              </span>
              <span className="stationName">
                {this.props.detail.destination.name} &nbsp;
              </span>
              <span className="PlatformName">
                Platform: {this.props.detail.legs[0].arrivalPlatform}
              </span>
            </p>
          </div>
          <div className="InfoContainer">
            <p className="Duration">
              <img height="16px" src="/time.svg" alt="duration" />
              {duration.slice(0, 2) + "h " + duration.slice(3, 5) + "m"}
            </p>{" "}
            |
            <p className="Change">
              <img height="16px" src="/connection.svg" alt="changes" />
              {this.props.detail.legs.length - 1} Changes
            </p>{" "}
            |
            <ul className="trainproduct">
              <img height="16px" src="/train.svg" alt="train" />
              {this.props.detail.legs.map((el, i) => {
                return <li key={i}>{el.line.product} &nbsp;</li>;
              })}
            </ul>
          </div>
          <div className="Pricecontainer">
            <div className="Price2">
              <p>
                2nd Class <br />
                {this.props.detail.normalPrice}0 €
              </p>
            </div>
            <div className="Price1">
              <p>
                1st Class <br />
                {this.props.detail.firstClass
                  ? this.props.detail.firstClass
                  : "not available"}
                0 €
              </p>
            </div>
          </div>

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
