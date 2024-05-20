import { readable } from "svelte/store";

const wnd = globalThis.window;
let initialPixelRatio = wnd?.devicePixelRatio;
calibrateInitialPixelRatio();

function calculateRatio() {
    return 1.0 * wnd?.screen.availWidth / globalThis.document?.documentElement.clientWidth;
}

function isWindowMaximized() {
    return wnd?.screenX === 0 && wnd?.screenY === 0
        && wnd?.outerWidth === wnd?.screen.availWidth
        && wnd?.outerHeight === wnd?.screen.availHeight;
}

function calibrateInitialPixelRatio() {
    if (!isWindowMaximized()) {
        return;
    }
    const maximizedRatio = calculateRatio();
    if (Math.abs(maximizedRatio - 1) < 0.000000001) {
        initialPixelRatio = wnd?.devicePixelRatio;
    }
    else {
        // Zoom is applied.
        initialPixelRatio = wnd?.devicePixelRatio / maximizedRatio;
    }
}

function calculateZoomRatio() {
    return 1 + 1.0 * (wnd?.devicePixelRatio - initialPixelRatio) / initialPixelRatio;
}


/**
 * Read-only store that returns the current window's zoom level.
 */
export default readable(calculateZoomRatio(), set => {
    wnd?.visualViewport?.addEventListener('resize', handleResize);

    return () => {
        wnd?.visualViewport?.removeEventListener('resize', handleResize);
    }

    function handleResize() {
        calibrateInitialPixelRatio();
        set(calculateZoomRatio());
    }
});
