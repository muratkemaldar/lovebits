import paper, { Tool } from "paper";
import React from "react";
import Bit from "./Bit";
import StageHOC from "./StageHOC";

const poem = `// Heartbeat

const me = new Bit('blue');
const you = new Bit('purple');

const heart = me.getHeart();
heart.setAnimationType('scale');

me.setHeartRate(
  100 * (100 / me.getDistanceTo(you.position))
);

if (me.heartRate > 100) {
  throw new HeartFailureException();
};`;

class Heartbeat extends React.Component {
  componentDidMount() {
    const { setCodeLayer, stageComplete } = this.props;
    setCodeLayer(poem);

    // paperjs
    paper.setup(this.canvas);
    paper.tools.forEach(tool => tool.remove());
    const canvasWidth = paper.view.bounds.width;

    const purpleBit = new Bit({
      color: "purple",
      position: paper.view.center.add(new paper.Point(canvasWidth / 4, 0))
    });

    const blueBit = new Bit({
      inLove: true,
      position: paper.view.center.subtract(new paper.Point(canvasWidth / 4, 0))
    });

    // Create a simple drawing tool:
    const tool = new Tool();
    let draggedItem;
    let heartFailed = false;

    blueBit.item.onMouseEnter = () => {
      if (!draggedItem && !heartFailed) {
        document.body.className = "grab";
      }
    };

    blueBit.item.onMouseLeave = () => {
      if (!draggedItem && !heartFailed) {
        document.body.className = "default";
      }
    };

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = event => {
      if (event.item) {
        draggedItem = event.item;
        document.body.className = "grabbing";
      }
    };

    tool.onMouseUp = event => {
      draggedItem = false;
      document.body.className = "default";

      // handling of cursor
      const hitResult = blueBit.item.hitTest(event.point);
      if (hitResult && !heartFailed) {
        document.body.className = "grab";
      } else {
        document.body.className = "default";
      }
    };

    tool.onMouseDrag = event => {
      if (draggedItem === blueBit.item) {
        blueBit.position = blueBit.position.add(event.delta);
      }
    };

    paper.view.onFrame = () => {
      // win condition
      if (blueBit.heartRate > 100) {
        stageComplete();
        blueBit.setHeartRate(0);
        blueBit.setText("HeartFailureException");
        blueBit.update();
        heartFailed = true;
      }

      if (heartFailed) return;

      // update blueBit to show heart rate
      blueBit
        .setHeartRate(100 * (100 / blueBit.getDistanceTo(purpleBit.position)))
        .setText(Math.floor(blueBit.heartRate));

      // loop
      purpleBit.update();
      blueBit.update();
    };
  }

  render() {
    return (
      <canvas
        resize="true"
        style={{ width: "100%", height: "100%" }}
        ref={el => {
          this.canvas = el;
        }}
      />
    );
  }
}

export default StageHOC(Heartbeat);
