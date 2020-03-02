import React from "react";

const ResultList = props => {
  let detail = props.details;

  return (
    <div key={detail.id}>
      <p>
        From: {detail.origin.name} at: {Date(detail.legs.departure)}, Platform:
        {detail.legs[0].departurePlatform}
      </p>
      <p>
        To: {detail.destination.name} at: {Date(detail.legs.arrival)}
        ,Platform:{detail.legs[0].arrivalPlatform}
      </p>
      <p>
        {detail.legs.map(trains => {
          return <span>{trains.line.name} </span>;
        })}
      </p>
      <p>
        {detail.price.currency}
        {detail.price.amount}
      </p>
    </div>
  );
};
export default ResultList;
