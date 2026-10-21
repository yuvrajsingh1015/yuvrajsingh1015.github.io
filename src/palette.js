export const isMac =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

// the shortcut as shown to the visitor
export const paletteKey = isMac ? "⌘K" : "Ctrl K";

// other components open the palette with this event
export function openPalette() {
  window.dispatchEvent(new Event("open-palette"));
}
