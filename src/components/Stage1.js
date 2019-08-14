import paper, { Tool } from "paper";
import React from "react";
import Bit from "./Bit";
import StageHOC from "./StageHOC";

const poem = `// Love at first sight

const me = new Bit('blue');
const you = new Bit('purple');

if (me.getDistanceTo(you.position) < 200) {
  me.setFeelings({
    inLove: true,
  })
}

// Try to understand the poems message. 
// Then run it by clicking on 
// the play button below.`;

class LoveAtFirstSight extends React.Component {
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
      distanceRingSize: 200,
      position: paper.view.center.subtract(new paper.Point(canvasWidth / 4, 0))
    });

    // Create a simple drawing tool:
    const tool = new Tool();
    let draggedItem;

    blueBit.item.onMouseEnter = () => {
      if (!draggedItem) {
        document.body.className = "grab";
      }
    };

    blueBit.item.onMouseLeave = () => {
      if (!draggedItem) {
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
      if (hitResult) {
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
      if (blueBit.getDistanceTo(purpleBit.position) < 200) {
        blueBit.setFeelings({
          inLove: true
        });
        stageComplete();
      }

      // update distance
      blueBit.setText(Math.floor(blueBit.getDistanceTo(purpleBit.position)));

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

export default StageHOC(LoveAtFirstSight);
