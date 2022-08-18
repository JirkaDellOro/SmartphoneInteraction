namespace SmartphoneInteraction {
  import ƒ = FudgeCore;

  window.addEventListener("load", start);

  function start(_event: Event): void {
    ƒ.DebugTextArea.textArea = document.querySelector("textarea")!;
    // let targets: ƒ.DebugTarget[] = [ƒ.DebugConsole, ƒ.DebugTextArea, ƒ.DebugAlert];
    ƒ.Debug.setFilter(ƒ.DebugTextArea, ƒ.DEBUG_FILTER.ALL);
    // ƒ.Debug.setFilter(ƒ.DebugAlert, ƒ.DEBUG_FILTER.ALL);
    ƒ.Debug.log("Hallo");

    let touch: ƒ.EventTouch = new ƒ.EventTouch(document);
    console.log(touch);

    document.addEventListener(ƒ.EVENT_TOUCH.NOTCH, <EventListener>((_event: CustomEvent) => ƒ.Debug.log("touchNotch", _event.detail.cardinal)));
    document.addEventListener(ƒ.EVENT_TOUCH.TAP, () => ƒ.Debug.log("touchTap"));
  }
}