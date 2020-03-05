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
    return (
      <div className="ShowDayContainer">
        <table className="table">
          <thead>
            <tr className="tablerow">
              <th>
                <button
                  className="DayBtn"
                  onClick={this.props.showDays}
                  value={moment(this.state.date)
                    .subtract(2, "days")
                    .format()}
                >
                  {moment(this.state.date)
                    .subtract(2, "days")
                    .format("ddd D MMM")}
                </button>
              </th>
              <th>
                <button
                  className="DayBtn"
                  onClick={this.props.showDays}
                  value={moment(this.state.date)
                    .subtract(1, "days")
                    .format()}
                >
                  {moment(this.state.date)
                    .subtract(1, "days")
                    .format("ddd D MMM")}
                </button>
              </th>
              <th>
                <button
                  className="DayBtn"
                  onClick={this.props.showDays}
                  value={this.state.date}
                >
                  {moment(this.state.date).format("ddd D MMM")}
                </button>
              </th>
              <th>
                <button
                  className="DayBtn"
                  onClick={this.props.showDays}
                  value={moment(this.state.date)
                    .add(1, "days")
                    .format()}
                >
                  {moment(this.state.date)
                    .add(1, "days")
                    .format("ddd D MMM")}
                </button>
              </th>
              <th>
                <button
                  className="DayBtn"
                  onClick={this.props.showDays}
                  value={moment(this.state.date)
                    .add(2, "days")
                    .format()}
                >
                  {moment(this.state.date)
                    .add(2, "days")
                    .format("ddd D MMM")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tablerow">
              <td></td>
              <td></td>
              <td className="DayPrice">Price3</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

{
}
