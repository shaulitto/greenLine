import React, { Component } from "react";
// var moment = require("moment");
import moment from "moment";
moment().format();

// Date.prototype.addDays = function() {
//   let days = 1;
//   var date = new Date(this.valueOf());
//   date.setDate(date.getDate() + days);
//   // return date;
//   console.log(date);
//   this.setState({
//     oneDate: date
//   });
// };

export default class Results extends Component {
  state = {
    date: this.props.dates.slice(),
    oneDate: ""
  };
  // setDate = () => {
  //   let startdate = "20.03.2014";
  //   var new_date = moment(startdate, "DD-MM-YYYY").add("days", 5);

  //   var day = new_date.format("DD");
  //   var month = new_date.format("MM");
  //   var year = new_date.format("YYYY");
  //   console.log(day + "." + month + "." + year);
  //   return day + "." + month + "." + year;
  // };
  // componentDidMount() {
  //   if (this.props.date) {
  // if (this.props.dates) {
  //   const copy = new Date(Number(this.state.date.slice()));
  //   copy.setDate(date.getDate() + days);
  //   return copy;
  //   return this.state.date.setDate(this.date.getDate() + 1);
  //   // // console.log("COPY", copy);
  //   }
  // }
  render() {
    console.log(this.state.date);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>{}</th>
              <th>{this.state.date}</th>
              <th>{this.state.date}</th>
              <th>{moment(this.state.date).add(1, "days")}</th>
              <th>{}</th>
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
  // state = {
  //   date: `${new Date()}`
  // };
  /* <thead>
<tr>
  <th>
    {" "}
    {this.props.dates.slice(0, 9) +
      (this.props.dates.slice(9, 10) - 2)}
  </th>
  <th>
    {this.props.dates.slice(0, 9) +
      (this.props.dates.slice(9, 10) - 1)}
  </th>
  <th>{this.props.dates.slice(0, 10)}</th>
  <th>
    {" "}
    {this.props.dates.slice(0, 9) +
      (this.props.dates.slice(9, 10) + 1)}
  </th>
  <th>
    {" "}
    {this.props.dates.slice(0, 9) +
      (this.props.dates.slice(9, 10) + 2)}
  </th>
</tr>
</thead> */
}
