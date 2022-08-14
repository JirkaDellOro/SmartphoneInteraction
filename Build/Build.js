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
        document.addEventListener("pointerdown", hndPointerEvent);
        document.addEventListener("pointerup", hndPointerEvent);
        document.addEventListener("pointermove", hndPointerEvent);
    }
    function hndPointerEvent(_event) {
        ƒ.Debug.log(_event.pointerType, _event.pointerId, TouchList.length);
    }
})(SmartphoneInteraction || (SmartphoneInteraction = {}));
