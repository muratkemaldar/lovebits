import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import onClickOutside from "react-onclickoutside";
import { useTransition, animated } from "react-spring";

const AppMenu = ({ location = {}, defaultIsOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const toggle = () => setIsOpen(!isOpen);

  AppMenu.handleClickOutside = () => setIsOpen(false);

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 1, transform: "translate3d(-100%, 0%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0%, 0)" },
    leave: { opacity: 1, transform: "translate3d(-100%, 0%, 0)" }
  });

  return (
    <div className="app-menu">
      <button
        style={{
          color: location.pathname.includes("/poem/") ? "white" : "black",
          transition: "all 1s"
        }}
        onClick={toggle}
        type="button"
        className="app-menu-toggle"
      >
        Menu
      </button>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={{
                ...props,
                position: "absolute",
                top: 100,
                right: "auto",
                bottom: "auto",
                left: 0,
                transformOrigin: "50% 50% 0"
              }}
            >
              <div className="app-menu-content">
                <nav>
                  <ul>
                    <li>
                      <NavLink
                        activeClassName="active"
                        className="nav-button"
                        to="/poems"
                      >
                        Go to poem selection
                      </NavLink>
                      <ul>
                        <li>
                          <NavLink
                            to="/poem/love-at-first-sight"
                            activeClassName="active"
                            className="nav-button"
                          >
                            Poem: Love at first sight
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/poem/heartbeat"
                            activeClassName="active"
                            className="nav-button"
                          >
                            Poem: Heartbeat
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/poem/sunset"
                            activeClassName="active"
                            className="nav-button"
                          >
                            Poem: Sunset
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/poem/the-promise"
                            activeClassName="active"
                            className="nav-button"
                          >
                            Poem: The promise
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        className="nav-s"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.smashingmagazine.com/2018/07/writing-code-poems/"
                      >
                        Smashing Magazine Article:
                        <br /> Learning To Code By Writing Code Poems
                      </a>
                    </li>
                    <li>
                      Project by{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://twitter.com/murimuffin5"
                      >
                        Murat Kemaldar
                      </a>
                      <br />
                      If you have poem ideas, let me know!
                    </li>
                  </ul>
                </nav>
              </div>
            </animated.div>
          )
      )}
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => AppMenu.handleClickOutside
};

export default withRouter(onClickOutside(AppMenu, clickOutsideConfig));
