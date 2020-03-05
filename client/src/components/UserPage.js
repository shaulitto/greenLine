import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserPage extends Component {
  // searchFavorite = e => {
  //   e.preventDefault();

  // };

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
