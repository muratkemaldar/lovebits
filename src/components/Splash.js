import React from "react";
import { Link } from "react-router-dom";
import CenteredFlex from "./CenteredFlex";

const Splash = () => (
  <CenteredFlex>
    <div className="splash">
      <div className="content">
        <div className="lovebits-logo">
          <div className="mb"></div>
          <div className="fb"></div>
        </div>
        <h1>LoveBits</h1>
        <p>
          LoveBits is about showing that code can be used like any other spoken
          language. Even poetically.
        </p>
        <Link
          role="button"
          className="block back-btn full-width filled"
          to="/poems"
        >
          Start
        </Link>
        <p>
          Project by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/muratkemaldar"
          >
            Murat Kemaldar (@muratkemaldar)
          </a>
        </p>
      </div>
    </div>
  </CenteredFlex>
);

export default Splash;
