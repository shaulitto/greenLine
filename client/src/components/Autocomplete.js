import React, { Component } from "react";

export default class Autocomplete extends Component {
  state = {
    loading: true,
    showLoader: true
  };

  componentDidMount() {
    // this.props.results.forEach(c => {
    //   if (!this.state.cities.includes(c.address.city)) {
    //     this.setState({
    //       cities: [...this.state.cities, c.address.city]
    //     });
    //   }
    // });

    setTimeout(() => {
      if (this.state.loading) {
        this.setState({ showLoader: false });
        // console.log(this.state.showLoader);
      }
    }, 4000);
  }
  render() {
    const cities = [];
    this.props.results.forEach(c => {
      if (!cities.includes(c.address.city)) {
        cities.push(c.address.city);
      }
    });
    let options = this.props.results.slice(0, 10).map(r => (
      <li
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
          name={this.props.name}
          id={this.props.id}
          onChange={this.props.onChange}
          value={this.props.value}
        />

        {!this.state.showLoader && (
          <ul>
            {cities.map(el => {
              return (
                <li
                  onClick={e => {
                    this.props.updateText(e.target.innerText, el.id);
                  }}
                  key={el.id}
                >
                  {el}
                </li>
              );
            })}
            {options}
          </ul>
        )}
      </>
    );
  }
}
