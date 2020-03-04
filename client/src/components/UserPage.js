import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserPage extends Component {
  searchFavorite = e => {
    e.preventDefault();

    console.log("SEARCHINGGG", e.target);

    // return <SearchForm favoriteSearch={this.props.favorites} />;
  };

  render() {
    return (
      <div>
        <form onSubmit={this.searchFavorite}>
          {this.props.favorites.map(details => {
            return (
              <div key={this.props.favorites._id}>
                {details.origin}
                {details.destination}
                {details.date.slice(0, 21)}
                {/* <Link
                  to={`/api/price?date=${details.date.slice(0, 16)}&fromId=${
                    details.originId
                  }&toId=${details.destinationId}`}
                > */}
                <Link
                  to={{
                    pathname: "/",
                    state: {
                      date: details.date.slice(0, 16),
                      fromId: details.originId,
                      toId: details.destinationId,
                      to: details.origin,
                      from: details.destination
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
