import React, { Component } from "react";
import SearchForm from "./SearchForm";
import { Link } from "react-router-dom";

export default class UserPage extends Component {
  searchFavorite = e => {
    console.log("SEARCHONGGG", e);
    // return <SearchForm favoriteSearch={this.props.favorites} />;
  };
  render() {
    return (
      <div>
        <form onSubmit={this.searchFavorite}>
          {this.props.favorites.map(details => {
            return (
              <div>
                {details.origin}
                {details.destination}
                {details.date.slice(0, 21)}

                <button>Search</button>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}
