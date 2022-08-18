"use strict";
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
        let touch = new SmartphoneInteraction.ƒ.EventTouch(document);
        console.log(touch);
        document.addEventListener(SmartphoneInteraction.ƒ.EVENT_TOUCH.NOTCH, ((_event) => SmartphoneInteraction.ƒ.Debug.log("touchNotch", _event.detail.cardinal)));
        document.addEventListener(SmartphoneInteraction.ƒ.EVENT_TOUCH.TAP, () => SmartphoneInteraction.ƒ.Debug.log("touchTap"));
    }
})(SmartphoneInteraction || (SmartphoneInteraction = {}));
