import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserPage extends Component {
  // searchFavorite = e => {
  //   e.preventDefault();

  // };

  orderedDate = str => {
    const hour = str.slice(11, 16);
    const date = new Date(str).toDateString();
    return `${hour} ${date}`;
  };

  render() {
    return (
      <div className="savedTripContainer">
        Your saved Connections
        <form onSubmit={this.searchFavorite}>
          {this.props.favorites.map(details => {
            return (
              <div className="savedTrips" key={this.props.favorites._id}>
                From <span className="stationName">{details.origin}</span>{" "}
                &nbsp; to{" "}
                <span className="stationName">{details.destination}</span>{" "}
                &nbsp;at: &nbsp;
                {this.orderedDate(details.date)}
                <Link
                  to={{
                    pathname: "/",
                    state: {
                      date: details.date,
                      fromId: details.originId,
                      toId: details.destinationId,
                      to: details.destination,
                      from: details.origin
                    }
                  }}
                >
                  <button>Search</button>
                </Link>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}
