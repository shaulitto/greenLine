import React, { Component } from "react";

export default class Results extends Component {
  setDate = () => {
    if (this.props.location.state) {
      console.log("coming from user", this.props.location.state);
      this.searchPrice(this.props.location.state);
      window.history.pushState(null, "");
    }
  };

  componentDidMount() {
    if (this.props.date) {
      const date = new Date(this.props.date);
      console.log("Date yo!", date);
      return date.setDate(date.getDate() + 10);
      // console.log("COPY", copy);
      // copy.setDate(date.getDate() + 1);
    }
  }
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Date 1</th>
              <th>{new Date(this.setDate())}</th>
              <th>{this.props.date.slice(0, 10)}</th>
              <th>Date 4</th>
              <th>Date 5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Price1</td>
              <td>Price2</td>
              <td>Price3</td>
              <td>Price4</td>
              <td>Price5</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
