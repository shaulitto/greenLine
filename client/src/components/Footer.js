import React from "react";

export default function Footer() {
  return (
    <div className="Footer">
      {" "}
      Made by&nbsp;
      <a
        href="https://www.linkedin.com/in/kdauer/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Konstantin Dauer
      </a>
      ,&nbsp;
      <a
        href="https://www.linkedin.com/in/minatallah-hisham/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Minatallah Hisham
      </a>
      &nbsp;and&nbsp;
      <a
        href="https://www.linkedin.com/in/shaulmansour/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Shaul Mansour
      </a>
      &nbsp;during Ironhack Bootcamp January 2020 <br />
      <p>
        {" "}
        powered by&nbsp;{" "}
        <img height="16px" src="/Deutsche_Bahn_AG-Logo.svg" alt="DB Logo" />
      </p>
      <div></div>
    </div>
  );
}
