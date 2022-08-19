"use strict";
var SmartphoneInteraction;
(function (SmartphoneInteraction) {
    var ƒ = FudgeCore;
    window.addEventListener("load", start);
    function start(_event) {
        ƒ.DebugTextArea.textArea = document.querySelector("textarea");
        // let targets: ƒ.DebugTarget[] = [ƒ.DebugConsole, ƒ.DebugTextArea, ƒ.DebugAlert];
        ƒ.Debug.setFilter(ƒ.DebugTextArea, ƒ.DEBUG_FILTER.ALL);
        // ƒ.Debug.setFilter(ƒ.DebugAlert, ƒ.DEBUG_FILTER.ALL);
        ƒ.Debug.log("Hallo");
        let touch = new ƒ.EventTouch(document);
        console.log(touch);
        document.addEventListener(ƒ.EVENT_TOUCH.NOTCH, ((_event) => ƒ.Debug.log("touchNotch", _event.detail.cardinal)));
        document.addEventListener(ƒ.EVENT_TOUCH.TAP, () => ƒ.Debug.log("touchTap"));
        document.addEventListener(ƒ.EVENT_TOUCH.DOUBLE, () => ƒ.Debug.log("touchDouble"));
    }
})(SmartphoneInteraction || (SmartphoneInteraction = {}));
