"use strict";
var SmartphoneInteraction;
(function (SmartphoneInteraction) {
    var ƒ = FudgeCore;
    window.addEventListener("load", start);
    function start(_event) {
        ƒ.DebugTextArea.textArea = document.querySelector("textarea");
        // let targets: ƒ.DebugTarget[] = [ƒ.DebugConsole, ƒ.DebugTextArea, ƒ.DebugAlert];
        ƒ.Debug.setFilter(ƒ.DebugTextArea, ƒ.DEBUG_FILTER.ALL);
        ƒ.Debug.log("Hallo");
    }
})(SmartphoneInteraction || (SmartphoneInteraction = {}));
