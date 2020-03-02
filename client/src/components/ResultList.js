import React from "react";

const ResultList = props => {
  let detail = props.details;
  const departure = new Date(detail.legs[0].departure);
  const arrival = new Date(detail.legs[detail.legs.length - 1].arrival);
  const duration = new Date(+arrival - +departure).toLocaleTimeString();

  return (
    <div>
      <p>
        From: {detail.origin.name} at:
        {new Date(detail.legs[0].departure).toString().slice(0, 21)}, Platform:
        {detail.legs[0].departurePlatform}
      </p>
      <p>
        To: {detail.destination.name} at:{" "}
        {new Date(detail.legs[0].arrival).toString().slice(0, 21)}
        ,Platform:{detail.legs[0].arrivalPlatform}
      </p>

      <p>Duration: {duration.slice(0, 1) + "h" + duration.slice(2, 4) + "m"}</p>
      <p>Changes: {detail.legs.length - 1}</p>
      <p>
        First Class:
        {detail.firstClass}
      </p>
      <p>
        Second Class:
        {detail.normalPrice}
      </p>
      <ul>
        {detail.legs.map(el => {
          return (
            <li key={detail.id} style={{ border: "1px solid red" }}>
              {el.line.product}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ResultList;
