import { Rectangle, Path, Point, Size, PointText } from "paper";

const heartPath = `M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z`;

class Bit {
  constructor(props = {}) {
    // base props
    this.inLove = props.inLove || false;
    this.position = props.position || new Point(96, 128);
    this.size = props.size || new Size(64, 64);

    // heart
    this.heart = new Path(heartPath);
    this.heart.fillColor = "red";
    this.heart.position = this.position;
    this.heart.visible = false;
    this.heartRate = props.heartRate || 0;
    this.heartDestinationSize = 45;

    // text
    this.text = props.text || undefined;
    this.textItem = new PointText({
      justification: "center",
      fillColor: "white"
    });

    this.distanceRingSize = props.distanceRingSize || undefined;
    if (this.distanceRingSize) {
      this.circle = new Path.Circle(this.position, this.distanceRingSize);
      this.circle.strokeColor = "#333";
    }

    // item (shape)
    const rect = new Rectangle(this.position, this.size);
    const path = new Path.Rectangle(rect);
    path.fillColor = props.color || "#5f93ae";
    this.item = path;
    this.item.position = this.position;
  }

  setText(text) {
    this.text = text;
    return this;
  }

  setHeartRate(heartRate = 100) {
    this.heartRate = heartRate;
    return this;
  }

  setFeelings(feelings = {}) {
    this.inLove = feelings.inLove || this.inLove;
    return this;
  }

  getDistanceTo(position = { x: 64, y: 64 }) {
    const center = new Point(this.position);
    const distance = center.getDistance(position);
    return distance;
  }

  // updating
  update() {
    this.item.position = this.position;

    if (this.text) {
      this.textItem.position = new Point(
        this.item.position.x,
        this.item.position.y + 55
      );
      this.textItem.content = this.text;
    }

    if (this.circle) {
      this.circle.position = this.position;
    }

    if (this.inLove) {
      this.heart.visible = true;
      this.heart.position = {
        x: this.position.x,
        y: this.position.y - 60
      };

      if (this.heartRate) {
        const diff = this.heartDestinationSize - this.heart.bounds.size.width;

        const diffModifier = 1 + (1 * 100) / this.heartRate;
        this.heart.bounds.size.width += diff / diffModifier;
        this.heart.bounds.size.height += diff / diffModifier;

        if (diff < 1 && this.heartDestinationSize === 45) {
          this.heartDestinationSize = 35;
        } else if (diff > -1 && this.heartDestinationSize === 35) {
          this.heartDestinationSize = 45;
        }
      }
    }
  }
}

export default Bit;
