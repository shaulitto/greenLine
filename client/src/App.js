import React from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";

class App extends React.Component {
  state = {
    user: this.props.user
    //tripResult: []
  };

  setUser = userObj => {
    this.setState({
      user: userObj
    });
  };

  // removeTripResults = () => {
  //   this.setState({ tripResults: [] });
  // };

  // removeTripResults = arrayOfResults => {
  //   this.setState({ tripResults: arrayOfResults });
  // };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar setUser={this.setUser} user={this.state.user} />

          <div>
            <Route
              path="/signup"
              render={props => (
                <Signup history={props.history} setUser={this.setUser} />
              )}
            />
          </div>

          <Route
            path="/login"
            render={props => (
              <Login history={props.history} setUser={this.setUser} />
            )}
          />
        </header>
        <Route
          exact
          path="/"
          render={props => (
            <SearchForm
              setTripResults={this.setTripResults}
              tripResult={this.state.tripResult}
              {...props}
              isLoggedIn={Boolean(this.state.user)}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
