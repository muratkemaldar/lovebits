import React from "react";
import { Redirect, Link } from "react-router-dom";
import hljs from "hljs";

export default function StageHOC(WrappedStage) {
  return class LoveBitsStage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        codeLayerVisible: true,
        returnToStageSelect: false,
        stageComplete: false,
        stageCompletionMessage: "Well done!"
      };
    }

    onToggleLayer() {
      this.setState(prevState => ({
        codeLayerVisible: !prevState.codeLayerVisible
      }));
    }

    setCodeLayer(code) {
      this.setState({ codeLayer: code }, () => {
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
      });
    }

    setPlayLayerOverlay(overlay) {
      this.setState({
        playLayerOverlay: overlay
      });
    }

    returnToStageSelect() {
      this.setState({
        returnToStageSelect: true
      });
    }

    stageComplete(completionMessage) {
      this.setState({
        stageComplete: true,
        stageCompletionMessage: completionMessage || "Well done!"
      });
    }

    render() {
      const {
        codeLayerVisible,
        codeLayer,
        playLayerOverlay,
        returnToStageSelect,
        stageComplete,
        stageCompletionMessage
      } = this.state;

      return (
        <div className="Stage">
          <WrappedStage
            setCodeLayer={this.setCodeLayer.bind(this)}
            setPlayLayerOverlay={this.setPlayLayerOverlay.bind(this)}
            stageComplete={this.stageComplete.bind(this)}
            codeLayerVisible={codeLayerVisible}
          />

          {returnToStageSelect && <Redirect to="/stage-select" />}

          {playLayerOverlay && (
            <div className="play-layer-overlay">{playLayerOverlay}</div>
          )}

          <div
            className={codeLayerVisible ? "code-layer" : "code-layer hidden"}
          >
            <pre>
              <code className="javascript">{codeLayer}</code>
            </pre>
          </div>

          {stageComplete && (
            <div className="stage-complete">
              <p>
                <strong>{stageCompletionMessage}</strong>
              </p>
              <Link to="/poems">Select new poem</Link>
              {" / "}
              <button
                type="button"
                className="text-link"
                onClick={() => window.location.reload()}
              >
                Restart
              </button>
            </div>
          )}

          <button
            type="button"
            className="code-play-toggle full-width"
            onClick={() => {
              this.onToggleLayer();
            }}
          >
            {codeLayerVisible ? "Play" : "Code"}
          </button>
        </div>
      );
    }
  };
}
