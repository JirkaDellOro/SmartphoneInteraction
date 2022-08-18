namespace SmartphoneInteraction {
  export class EventTouch {
    public posStart: ƒ.Vector2 = ƒ.Vector2.ZERO();
    public posNotch: ƒ.Vector2 = ƒ.Vector2.ZERO();
    public radiusTap: number;
    public radiusNotch: number;
    private target: EventTarget;
    private posPrev: ƒ.Vector2 = ƒ.Vector2.ZERO();
    private moved: boolean = false;

    public constructor(_target: EventTarget, _radiusTap: number = 5, _radiusNotch: number = 50) {
      _target.addEventListener("touchstart", <EventListener>this.hndEvent);
      _target.addEventListener("touchend", <EventListener>this.hndEvent);
      _target.addEventListener("touchmove", <EventListener>this.hndEvent);
      document.addEventListener("touchcancel", <EventListener>this.hndEvent);
      this.target = _target;
      this.radiusTap = _radiusTap;
      this.radiusNotch = _radiusNotch;
    }

    public hndEvent = (_event: TouchEvent): void => {
      _event.preventDefault();
      let touchLast: Touch = _event.touches[0];
      let position: ƒ.Vector2 = new ƒ.Vector2(touchLast?.clientX, touchLast?.clientY);
      let offset: ƒ.Vector2;

      switch (_event.type) {
        case "touchstart":
          this.moved = false;
          this.startGesture(position);
          break;
        case "touchend":
        case "touchcancel":
          if (_event.touches.length > 0) {
            // still touches active
            this.startGesture(position);
            break;
          }

          // check if there was movement, otherwise fire tap
          if (!this.moved)
            this.target.dispatchEvent(
              new CustomEvent("touchTap", {
                bubbles: true, detail: { position: position, touches: _event.touches }
              })
            );
          break;
        case "touchmove":
          offset = ƒ.Vector2.DIFFERENCE(this.posPrev, this.posStart);
          this.moved = (offset.magnitude < this.radiusTap); // remember that touch moved over tap radius

          // fire notch when touches moved out of notch radius and reset notch
          offset = ƒ.Vector2.DIFFERENCE(position, this.posNotch);
          if (offset.magnitude > this.radiusNotch) {
            let cardinal: ƒ.Vector2 = Math.abs(offset.x) > Math.abs(offset.y) ?
              ƒ.Vector2.X(offset.x < 0 ? -1 : 1) :
              ƒ.Vector2.Y(offset.y < 0 ? -1 : 1);
            this.target.dispatchEvent(
              new CustomEvent("touchNotch", {
                bubbles: true, detail: { position: position, touches: _event.touches, offset: offset, cardinal: cardinal }
              }));
            this.posNotch = position;
          }
          //TODO: pinch, rotate...
          break;
        default:
          break;
      }

      this.posPrev.set(position.x, position.y);
    }

    private startGesture(_position: ƒ.Vector2): void {
      this.posNotch.set(_position.x, _position.y);
      this.posStart.set(_position.x, _position.y);
    }
  }
}