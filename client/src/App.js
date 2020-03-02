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
    tripResults: []
  };

  setUser = userObj => {
    this.setState({
      user: userObj
    });
  };

  setTripResults = arrayOfResults => {
    this.setState({ tripResults: arrayOfResults });
  };
  // this.props.saveUserInput(res.data)

  render() {
    console.log(this.state.tripResults);
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
              <Login
                history={props.history}
                setUser={this.setUser}
                isLoggedIn={Boolean(this.state.user)}
              />
            )}
          />
        </header>
        <Route
          exact
          path="/"
          render={props => (
            <SearchForm
              setTripResults={this.setTripResults}
              {...props}
              isLoggedIn={Boolean(this.state.user)}
            />
          )}
        />
        <Route
          exact
          path="/journeys"
          render={props => (
            <UserPage {...props} isLoggedIn={Boolean(this.state.user)} />
          )}
        />
      </div>
    );
  }
}

export default App;
