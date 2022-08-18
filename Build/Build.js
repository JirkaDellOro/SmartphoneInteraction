"use strict";
var SmartphoneInteraction;
(function (SmartphoneInteraction) {
    class EventTouch {
        posStart = SmartphoneInteraction.ƒ.Vector2.ZERO();
        posNotch = SmartphoneInteraction.ƒ.Vector2.ZERO();
        radiusTap;
        radiusNotch;
        target;
        posPrev = SmartphoneInteraction.ƒ.Vector2.ZERO();
        moved = false;
        constructor(_target, _radiusTap = 5, _radiusNotch = 50) {
            _target.addEventListener("touchstart", this.hndEvent);
            _target.addEventListener("touchend", this.hndEvent);
            _target.addEventListener("touchmove", this.hndEvent);
            document.addEventListener("touchcancel", this.hndEvent);
            this.target = _target;
            this.radiusTap = _radiusTap;
            this.radiusNotch = _radiusNotch;
        }
        hndEvent = (_event) => {
            _event.preventDefault();
            let touchLast = _event.touches[0];
            let position = new SmartphoneInteraction.ƒ.Vector2(touchLast?.clientX, touchLast?.clientY);
            let offset;
            switch (_event.type) {
                case "touchstart":
                    this.moved = false;
                    this.startGesture(position);
                    break;
                case "touchend":
                    if (_event.touches.length > 0) {
                        // still touches active
                        this.startGesture(position);
                        break;
                    }
                    // check if there was movement, otherwise fire tap
                    if (!this.moved)
                        this.target.dispatchEvent(new CustomEvent("touchTap", {
                            bubbles: true, detail: { position: position, touches: _event.touches }
                        }));
                    break;
                case "touchmove":
                    offset = SmartphoneInteraction.ƒ.Vector2.DIFFERENCE(this.posPrev, this.posStart);
                    this.moved ||= (offset.magnitude < this.radiusTap); // remember that touch moved over tap radius
                    // fire notch when touches moved out of notch radius and reset notch
                    offset = SmartphoneInteraction.ƒ.Vector2.DIFFERENCE(position, this.posNotch);
                    if (offset.magnitude > this.radiusNotch) {
                        let cardinal = Math.abs(offset.x) > Math.abs(offset.y) ?
                            SmartphoneInteraction.ƒ.Vector2.X(offset.x < 0 ? -1 : 1) :
                            SmartphoneInteraction.ƒ.Vector2.Y(offset.y < 0 ? -1 : 1);
                        this.target.dispatchEvent(new CustomEvent("touchNotch", {
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
        };
        startGesture(_position) {
            this.posNotch.set(_position.x, _position.y);
            this.posStart.set(_position.x, _position.y);
        }
    }
    SmartphoneInteraction.EventTouch = EventTouch;
})(SmartphoneInteraction || (SmartphoneInteraction = {}));
var SmartphoneInteraction;
(function (SmartphoneInteraction) {
    SmartphoneInteraction.ƒ = FudgeCore;
    window.addEventListener("load", start);
    function start(_event) {
        SmartphoneInteraction.ƒ.DebugTextArea.textArea = document.querySelector("textarea");
        // let targets: ƒ.DebugTarget[] = [ƒ.DebugConsole, ƒ.DebugTextArea, ƒ.DebugAlert];
        SmartphoneInteraction.ƒ.Debug.setFilter(SmartphoneInteraction.ƒ.DebugTextArea, SmartphoneInteraction.ƒ.DEBUG_FILTER.ALL);
        // ƒ.Debug.setFilter(ƒ.DebugAlert, ƒ.DEBUG_FILTER.ALL);
        SmartphoneInteraction.ƒ.Debug.log("Hallo");
        let touch = new SmartphoneInteraction.EventTouch(document);
        console.log(touch);
        document.addEventListener("touchNotch", ((_event) => SmartphoneInteraction.ƒ.Debug.log("touchNotch", _event.detail.cardinal)));
        document.addEventListener("touchTap", () => SmartphoneInteraction.ƒ.Debug.log("touchTap"));
    }
})(SmartphoneInteraction || (SmartphoneInteraction = {}));
