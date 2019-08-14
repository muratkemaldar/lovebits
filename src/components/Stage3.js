import paper from "paper";
import React from "react";
import Bit from "./Bit";
import StageHOC from "./StageHOC";

const poem = `// Sunset

const me = new Bit('blue');
const you = new Bit('purple');

const sun = new Bit('yellow');
sun.position.y += 1;

const rightTimeToConfessLove = 
  sun.position.hitTest(horizon);

if (rightTimeToConfessLove) {
  try {
    me.confessLove();
  } catch (FriendZoneException) {
    me.setFeelings({
      sad: true,
    })
  }
}`;

class Sunset extends React.Component {
  state = {
    isSunSetting: false,
    isRightTime: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      isSunSetting: !nextProps.codeLayerVisible
    };
  }

  componentDidMount() {
    const stage = this;
    const { setCodeLayer, stageComplete, setPlayLayerOverlay } = stage.props;
    setCodeLayer(poem);

    // paperjs
    paper.setup(stage.canvas);
    paper.tools.forEach(tool => tool.remove());

    // horizon
    const horizon = new paper.Path.Line(
      paper.view.bounds.leftCenter,
      paper.view.bounds.rightCenter
    );
    horizon.strokeWidth = 1;
    horizon.strokeColor = "yellow";

    // sun
    const sunBit = new Bit({
      position: paper.view.bounds.topRight.add(-128, 64),
      color: "yellow"
    });

    // foreground
    const foreground = new paper.Path.Rectangle(
      paper.view.bounds.leftCenter,
      paper.view.bounds.size
    );
    foreground.fillColor = "black";

    // bits
    const blueBit = new Bit({
      position: paper.view.bounds.bottomLeft.add(154, -160)
    });

    const purpleBit = new Bit({
      color: "purple",
      position: paper.view.bounds.bottomLeft.add(90, -160)
    });

    setPlayLayerOverlay(
      <button
        type="button"
        onClick={() => {
          if (stage.state.isRightTime) {
            setPlayLayerOverlay(null);
            purpleBit.setFeelings({ inLove: true });
            blueBit.setText("me.love(you)");
            stageComplete();
          } else {
            setPlayLayerOverlay(null);
            blueBit.setText(":(");
            stageComplete("FriendZoneException");
          }
        }}
      >
        Confess love
      </button>
    );

    paper.view.onFrame = () => {
      // sun + horizon
      if (stage.state.isSunSetting) {
        sunBit.position.y += 0.5;
        sunBit.update();
        if (sunBit.item.intersects(horizon)) {
          stage.setState({ isRightTime: true });
        } else {
          stage.setState({ isRightTime: false });
        }
      }

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

export default StageHOC(Sunset);
