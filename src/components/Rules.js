import React from "react";
import Links from "./Links";

const Rules = ({ visibleRules, handleRulesClick }) => {
  let className = "rules";

  if (visibleRules) {
    className = className + " on";
  } else {
    className = className + " off";
  }

  return (
    <div className={className}>
      <Links handleRulesClick={handleRulesClick} />
      <div className="container">
        <h1>RÈGLES</h1>
        <div className="bar"></div>
        <div className="text">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            beatae adipisci voluptatibus assumenda? Dolores cum vitae
            consequuntur mollitia accusamus perspiciatis, cupiditate soluta
            tempore suscipit dignissimos! Minus, aliquam optio? Laudantium,
            eaque.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            beatae adipisci voluptatibus assumenda? Dolores cum vitae
            consequuntur mollitia accusamus perspiciatis, cupiditate soluta
            tempore suscipit dignissimos! Minus, aliquam optio? Laudantium,
            eaque.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            beatae adipisci voluptatibus assumenda? Dolores cum vitae
            consequuntur mollitia accusamus perspiciatis, cupiditate soluta
            tempore suscipit dignissimos! Minus, aliquam optio? Laudantium,
            eaque.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            beatae adipisci voluptatibus assumenda? Dolores cum vitae
            consequuntur mollitia accusamus perspiciatis, cupiditate soluta
            tempore suscipit dignissimos! Minus, aliquam optio? Laudantium,
            eaque.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            beatae adipisci voluptatibus assumenda? Dolores cum vitae
            consequuntur mollitia accusamus perspiciatis, cupiditate soluta
            tempore suscipit dignissimos! Minus, aliquam optio? Laudantium,
            eaque.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
