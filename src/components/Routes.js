import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import LoveAtFirstSight from "./Stage1";
import Heartbeat from "./Stage2";
import Sunset from "./Stage3";
import ThePromise from "./Stage4";
import StageSelect from "./StageSelect";
import Splash from "./Splash";

export const stages = [
  {
    name: "Love at first sight",
    img: "./love-at-first-sight.png",
    path: "/poem/love-at-first-sight",
    component: LoveAtFirstSight
  },
  {
    name: "Heartbeat",
    img: "./heartbeat.png",
    path: "/poem/heartbeat",
    component: Heartbeat
  },
  {
    name: "Sunset",
    description: "#timingiseverything",
    img: "./sunset.png",
    path: "/poem/sunset",
    component: Sunset
  },
  {
    name: "The promise",
    description: "#intermediate #es6",
    img: "./the-promise.png",
    path: "/poem/the-promise",
    component: ThePromise
  }
];

const Routes = ({ location }) => {
  const transitions = useTransition(location, location => location.pathname, {
    initial: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
    from: { opacity: 0, transform: "translate3d(0, 100%, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0%, 0)" },
    leave: { opacity: 1, transform: "translate3d(0, 100%, 0)" }
  });
  return transitions.map(({ item, props, key }) => (
    <animated.div
      style={{
        ...props,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transformOrigin: "50% 50% 0"
      }}
      key={key}
    >
      <Switch location={item}>
        <Route path="/poems" render={() => <StageSelect stages={stages} />} />
        {stages.map(stage => (
          <Route
            path={stage.path}
            component={stage.component}
            key={stage.name}
          />
        ))}
        <Route component={Splash} />
      </Switch>
    </animated.div>
  ));
};

export default withRouter(Routes);
