declare namespace SmartphoneInteraction {
    class EventTouch {
        posStart: ƒ.Vector2;
        posNotch: ƒ.Vector2;
        radiusTap: number;
        radiusNotch: number;
        private target;
        private posPrev;
        private moved;
        constructor(_target: EventTarget, _radiusTap?: number, _radiusNotch?: number);
        hndEvent: (_event: TouchEvent) => void;
        private startGesture;
    }
}
declare namespace SmartphoneInteraction {
    export import ƒ = FudgeCore;
}
