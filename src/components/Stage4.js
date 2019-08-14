import paper, { Path, Tool } from "paper";
import React from "react";
import Bit from "./Bit";
import StageHOC from "./StageHOC";

const poem = `// The promise

const me = new Bit('blue');
const you = new Bit('purple');

const relationship = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a.getDistanceTo(b.position) < 100) {
      reject('tooClingy');
    } else if (a.getDistanceTo(b.position) > 400) {
      reject('tooFar');
    } else {
      resolve('justRight');
    }
  })
};

relationship(me, you).then(() => {
  me.setFeelings({inLove: true});
  you.setFeelings({inLove: true});
}).catch((reason) => {
  if (reason === 'tooFar' && stranger) {
    stranger.appear();
  }
})`;

class ThePromise extends React.Component {
  state = {
    isPurpleBitMoving: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      isPurpleBitMoving: !nextProps.codeLayerVisible
    };
  }

  componentDidMount() {
    const stage = this;
    const { setCodeLayer, stageComplete } = stage.props;

    setCodeLayer(poem);

    // paperjs
    paper.setup(stage.canvas);
    paper.tools.forEach(tool => tool.remove());

    // Create a simple drawing tool:
    const tool = new Tool();
    let draggedItem;

    const purpleBit = new Bit({
      color: "purple",
      position: paper.view.bounds.bottomLeft.add(90, -160)
    });

    // bits
    const blueBit = new Bit({
      position: paper.view.bounds.center
    });

    const strangerBit = new Bit({
      position: paper.view.bounds.bottomLeft.add(154, -160),
      color: "green"
    });

    strangerBit.item.opacity = 0;

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

    tool.onMouseDown = event => {
      if (event.item) {
        draggedItem = event.item;
        document.body.className = "grabbing";
      }
    };

    tool.onMouseUp = event => {
      draggedItem = false;
      document.body.className = "default";
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

    const line = new Path.Line();
    line.strokeWidth = 1;
    line.strokeColor = "white";

    let relationshipPower = 0.5;
    let showLine = true;

    const destinations = [
      paper.view.bounds.bottomLeft.add(90, -160),
      paper.view.bounds.bottomRight.add(-90, -160),
      paper.view.bounds.topRight.add(-90, 90),
      paper.view.bounds.topLeft.add(90, 90)
    ];

    let destinationIndex = 0;
    let modifier = 0.0015;

    paper.view.onFrame = () => {
      if (stage.state.isPurpleBitMoving) {
        if (destinations[destinationIndex]) {
          const remaining = destinations[destinationIndex].subtract(
            purpleBit.item.position
          );
          const speed = remaining.multiply(modifier);
          purpleBit.position = purpleBit.position.add(speed);
          modifier += 0.00025;

          if (remaining.length < 1) {
            destinationIndex += 1;
            modifier = 0.0015;
          }
        } else {
          destinationIndex = 0;
        }

        if (showLine) {
          line.segments[0].point = purpleBit.position;
          line.segments[1].point = blueBit.position;
          line.opacity = relationshipPower < 0 ? 0 : relationshipPower * 2;

          if (relationshipPower <= 0) {
            // fail
            showLine = false;
            line.visible = false;
            stageComplete("BrokenPromiseException");
            blueBit.setText(":(");
            purpleBit.setText(">:(");
            strangerBit.setText(";)");
            strangerBit.update();
          } else if (relationshipPower >= 1) {
            // win
            line.strokeColor = "yellow";
            blueBit.setFeelings({ inLove: true });
            purpleBit.setFeelings({ inLove: true });
            blueBit.setText(" ");
            purpleBit.setText(" ");
            stageComplete("Well done!");
          } else {
            // in-the-game
            line.strokeColor = "white";
            if (blueBit.getDistanceTo(purpleBit.position) < 100) {
              line.strokeWidth *= 0.99;
              relationshipPower -= 0.002;
            } else if (blueBit.getDistanceTo(purpleBit.position) > 400) {
              line.strokeWidth *= 0.99;
              relationshipPower -= 0.002;
            } else {
              relationshipPower += 0.002;
              line.strokeWidth *= 1.01;
            }

            blueBit.setText(
              Math.floor(blueBit.getDistanceTo(purpleBit.position))
            );
          }
        }
      }

      // loop
      purpleBit.update();
      blueBit.update();

      if (relationshipPower <= 0) {
        strangerBit.item.opacity += 0.002;

        if (purpleBit.getDistanceTo(strangerBit.position) < 100) {
          purpleBit.setText(";)");
        } else {
          purpleBit.setText(">:(");
        }
      }
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

export default StageHOC(ThePromise);
