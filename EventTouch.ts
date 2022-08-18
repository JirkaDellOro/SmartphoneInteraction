namespace SmartphoneInteraction {
  export class EventTouch {
    public posStart: ƒ.Vector2 = ƒ.Vector2.ZERO();
    public posNotch: ƒ.Vector2 = ƒ.Vector2.ZERO();
    public radiusTap: number;
    public radiusNotch: number;
    private target: EventTarget;

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
      let nTouches: number = _event.touches.length;
      let touchLast: Touch | undefined = _event.touches[nTouches - 1];
      let position: ƒ.Vector2 = new ƒ.Vector2(touchLast?.clientX, touchLast?.clientY);
      let offset: ƒ.Vector2;

      switch (_event.type) {
        case "touchstart":
          this.startGesture(position);
          break;
        case "touchend":
        case "touchcancel":

          if (nTouches > 0) {
            this.startGesture(position);
            break;
          }
          offset = ƒ.Vector2.DIFFERENCE(position, this.posStart);
      ƒ.Debug.log(position.magnitude);

          if (offset.magnitude < this.radiusTap)
            this.target.dispatchEvent(
              new CustomEvent("touchTap", {
                bubbles: true, detail: { position: position, touches: _event.touches }
              })
            );
          break;
        case "touchmove":
          offset = ƒ.Vector2.DIFFERENCE(position, this.posNotch);
          if (offset.magnitude > this.radiusNotch) {
            this.target.dispatchEvent(
              new CustomEvent("touchNotch", {
                bubbles: true, detail: { position: position, touches: _event.touches }
              }));
            this.posNotch = position;
          }
          break;
        default:
          break;
      }
    }

    private startGesture(_position: ƒ.Vector2): void {
      this.posNotch = this.posStart = _position;
      ƒ.Debug.log("Start Gesture");
    }

  }
}