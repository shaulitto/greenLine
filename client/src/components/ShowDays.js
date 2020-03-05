import React, { Component } from "react";
// var moment = require("moment");
import moment from "moment";
import { Link } from "react-router-dom";
moment().format();

export default class Results extends Component {
  state = {
    date: this.props.dates.slice()
  };

  render() {
    //console.log(this.state.date);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <button
                  onClick={this.props.showDays}
                  value={moment(this.state.date)
                    .subtract(2, "days")
                    .format()}
                >
                  {moment(this.state.date)
                    .subtract(2, "days")
                    .format("LL")}
                </button>
              </th>
              <th>
                <button
                  onClick={this.props.showDays}
                  value={moment(this.state.date)
                    .subtract(1, "days")
                    .format()}
                >
                  {moment(this.state.date)
                    .subtract(1, "days")
                    .format("LL")}
                </button>
              </th>
              <th>
                <button onClick={this.props.showDays} value={this.state.date}>
                  {this.state.date}
                </button>
              </th>
              <th>
                <button
                  onClick={this.props.showDays}
                  value={moment(this.state.date)
                    .add(1, "days")
                    .format()}
                >
                  {moment(this.state.date)
                    .add(1, "days")
                    .format("LL")}
                </button>
              </th>
              <th>
                <button
                  onClick={this.props.showDays}
                  value={moment(this.state.date)
                    .add(2, "days")
                    .format()}
                >
                  {moment(this.state.date)
                    .add(2, "days")
                    .format("LL")}
                </button>
              </th>
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

{
}
