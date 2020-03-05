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
    const str1 = this.props.detail.legs[0].departure;
    const str2 = this.props.detail.legs[this.props.detail.legs.length - 1]
      .arrival;
    const convert = (str1, str2) => {
      let departure = str1.slice(11, 16);
      let arrival = str2.slice(11, 16);
      let getMinutes =
        parseInt(arrival.slice(3, 5)) - parseInt(departure.slice(3, 5));
      let getHours =
        parseInt(arrival.slice(0, 2)) - parseInt(departure.slice(0, 2));
      if (getHours < 0) {
        getHours += 24;
      }
      if (getMinutes < 0) {
        getMinutes += 60;
      }
      if (getHours.toString().length === 1) {
        getHours = "0" + getHours;
      }
      if (getMinutes.toString().length === 1) {
        getMinutes = "0" + getMinutes;
      }
      return `${getHours}:${getMinutes}h`;
    };

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
                {this.props.detail.legs[
                  this.props.detail.legs.length - 1
                ].arrival.slice(11, 16)}{" "}
                &nbsp;
              </span>
              <span className="stationName">
                {this.props.detail.destination.name} &nbsp;
              </span>
              <span className="PlatformName">
                Platform:{" "}
                {
                  this.props.detail.legs[this.props.detail.legs.length - 1]
                    .arrivalPlatform
                }
              </span>
            </p>
          </div>
          <div className="InfoContainer">
            <p className="Duration">
              <img height="16px" src="/time.svg" alt="duration" />
              {convert(str1, str2)}
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
                  ? this.props.detail.firstClass + "0 €"
                  : "n. a."}
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
