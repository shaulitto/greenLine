import React, { Component } from "react";

export default class Autocomplete extends Component {
  render() {
    const cities = [];
    this.props.results.forEach(c => {
      if (!cities.includes(c.address.city)) {
        cities.push(c.address.city);
      }
    });
    let options = this.props.results.slice(0, 10).map(r => (
      <li
        className="AutocompleteItem"
        key={r.id}
        onClick={e => {
          this.props.updateText(e.target.innerText, r.id);
        }}
      >
        {r.name}
      </li>
    ));

    return (
      <>
        <input
          className="inputText"
          placeholder={this.props.placeholder}
          name={this.props.name}
          id={this.props.id}
          onChange={this.props.onChange}
          value={this.props.value}
        />

        <ul className="AutocompleteList">
          {cities.map((el, i) => {
            return (
              <li
                className="AutocompleteItem"
                key={i}
                onClick={e => {
                  this.props.updateText(e.target.innerText, el.id);
                }}
              >
                {el}
              </li>
            );
          })}
          {options}
        </ul>
      </>
    );
  }
}
