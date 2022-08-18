"use strict";
var SmartphoneInteraction;
(function (SmartphoneInteraction) {
    class EventTouch {
        posStart = SmartphoneInteraction.ƒ.Vector2.ZERO();
        posNotch = SmartphoneInteraction.ƒ.Vector2.ZERO();
        radiusTap;
        radiusNotch;
        target;
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
            let nTouches = _event.touches.length;
            let touchLast = _event.touches[nTouches - 1];
            let position = new SmartphoneInteraction.ƒ.Vector2(touchLast?.clientX, touchLast?.clientY);
            let offset;
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
                    offset = SmartphoneInteraction.ƒ.Vector2.DIFFERENCE(position, this.posStart);
                    SmartphoneInteraction.ƒ.Debug.log(position.magnitude);
                    if (offset.magnitude < this.radiusTap)
                        this.target.dispatchEvent(new CustomEvent("touchTap", {
                            bubbles: true, detail: { position: position, touches: _event.touches }
                        }));
                    break;
                case "touchmove":
                    offset = SmartphoneInteraction.ƒ.Vector2.DIFFERENCE(position, this.posNotch);
                    if (offset.magnitude > this.radiusNotch) {
                        this.target.dispatchEvent(new CustomEvent("touchNotch", {
                            bubbles: true, detail: { position: position, touches: _event.touches }
                        }));
                        this.posNotch = position;
                    }
                    break;
                default:
                    break;
            }
        };
        startGesture(_position) {
            this.posNotch = this.posStart = _position;
            SmartphoneInteraction.ƒ.Debug.log("Start Gesture");
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
        document.addEventListener("touchNotch", () => SmartphoneInteraction.ƒ.Debug.log("touchNotch"));
        document.addEventListener("touchTap", () => SmartphoneInteraction.ƒ.Debug.log("touchTap"));
    }
})(SmartphoneInteraction || (SmartphoneInteraction = {}));
