'use strict';

// Here's a brief sketch of the class
// with things that you'll need anyway
class HoverIntent {

  constructor({
    sensitivity = 0.1, // speed less than 0.1px/ms means "hovering over an element"
    interval = 100, // measure mouse speed once per 100ms: calculate the distance between previous and next points
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // make sure "this" is the object in event handlers.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // assign the handlers
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);

    // continue from this point
    this.checkSpeed = this.checkSpeed.bind(this);
  }

  checkSpeed() {
    let speed;
    // console.log(speed);

    if (!this.currentTime || this.currentTime == this.initTime)
      speed = 0;
    else {
    speed = Math.sqrt(
      (this.currentPointX - this.inPointX) ** 2 + 
      (this.currentPointY - this.inPointY) ** 2
      ) / (this.currentTime - this.initTime);
    }

    if (speed < this.sensitivity) {
      this.isHover = true;
      this.over();
      clearInterval(this.intervalId);
      return;
    }

    this.inPointX = this.currentPointX;
    this.inPointY = this.currentPointY;
    this.initTime = this.currentTime;
  }

  onMouseOver(event) {
    /* ... */
    if (this.isOverElement) return;

    this.isOverElement = true;

    this.inPointX = event.pageX;
    this.inPointY = event.pageY;

    this.initTime = Date.now();
    elem.addEventListener("mousemove", this.onMouseMove);

    this.intervalId = setInterval(this.checkSpeed, this.interval);
  }

  onMouseOut(event) {
    /* ... */
    if (this.elem.contains(event.relatedTarget)) return;

    this.isOverElement = false;
    clearInterval(this.intervalId);
    elem.removeEventListener("mousemove", this.onMouseMove);

    if (this.isHover) {
      this.out();
      this.isHover = false;
    }
  }

  onMouseMove(event) {
    /* ... */
    this.currentPointX = event.pageX;
    this.currentPointY = event.pageY;
    this.currentTime = Date.now();
  }


  destroy() {
    /* your code to "disable" the functionality, remove all handlers */
    /* it's needed for the tests to work */
    elem.removeEventListener("mouseover", this.onMouseOver);
    elem.removeEventListener("mouseout", this.onMouseOut);
    elem.removeEventListener("mousemove", this.onMouseMove);
  }

}