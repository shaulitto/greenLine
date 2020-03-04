import React from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import UserPage from "./components/UserPage";

class App extends React.Component {
  state = {
    user: this.props.user,
    resultListRender: false,
    favorites: this.props.favorites || []
    //newSearchForm: false
  };

  setUser = userObj => {
    this.setState({
      user: userObj
    });
  };

  resetTripResults = () => {
    this.setState({
      resultListRender: false
      //newSearchForm: true
    });
  };

  resultListSetTrue = () => {
    this.setState({
      resultListRender: true
    });
  };

  setFavorites = fave => {
    this.setState({
      favorites: [...this.state.favorites, fave]
    });
    console.log("favorites in App working", this.state.favorites);
  };

  render() {
    return (
      <div className="App">
        {/* <header className="App-header"> */}
        <Navbar
          setUser={this.setUser}
          user={this.state.user}
          //setTripResults={this.setTripResults}
          resetTripResults={this.resetTripResults}
        />
        <div>
          <Route
            path="/login"
            render={props => (
              <Login history={props.history} setUser={this.setUser} />
            )}
          />
        </div>

        <div>
          <Route
            path="/signup"
            render={props => (
              <Signup history={props.history} setUser={this.setUser} />
            )}
          />
        </div>

        <Route
          path="/user"
          render={props => (
            <UserPage
              history={props.history}
              setUser={this.setUser}
              favorites={this.state.favorites}
            />
          )}
        />
        <div className="HomeImage"></div>
        <Route
          exact
          path="/"
          render={props => (
            <SearchForm
              // setTripResults={this.setTripResults}
              {...props}
              isLoggedIn={Boolean(this.state.user)}
              resultListSetTrue={this.resultListSetTrue}
              resultListRender={this.state.resultListRender}
              setFavorites={this.setFavorites}
            />
          )}
        />

        {/* <Route
          path="/:favoriteId"
          render={props => (
            <SearchForm
              history={props.history}
              setUser={this.setUser}
              favorites={props.favorites}
            />
          )}
        /> */}
      </div>
    );
  }
}

export default App;
