import React from "react";

const Autocomplete = props => {
  const options = props.results.map(r => (
    <li
      key={r.id}
      onClick={e => {
        props.updateText(e.target.innerText, r.id);
      }}
    >
      {r.name}
    </li>
  ));
  return (
    <>
      <input
        name={props.name}
        id={props.id}
        onChange={props.handleInputChange}
        value={props.value}
      />
      <ul>{options}</ul>
    </>
  );
};

export default Autocomplete;
