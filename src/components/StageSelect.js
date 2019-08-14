import React from "react";
import { Link } from "react-router-dom";
import CenteredFlex from "./CenteredFlex";

const StageSelect = ({ stages }) => (
  <CenteredFlex>
    <div className="stage-select">
      <h1>Select code poem</h1>
      <br />
      <ul className="stage-select-list">
        {stages.map(stage => (
          <li className="stage-select-list-item" key={`stage-${stage.name}`}>
            <img src={stage.img} alt={stage.name} />
            <div className="vertical-space-between">
              <div>
                <h4>{stage.name}</h4>
                {stage.description && <p>{stage.description}</p>}
              </div>
              <Link className="button" to={stage.path}>
                Play
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <p>
        Have your own poem ideas?{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/murimuffin5"
        >
          Let me know!
        </a>
      </p>
    </div>
  </CenteredFlex>
);

export default StageSelect;
