import { useEffect } from "react";

// how far a trackpad gesture has to travel before the page jumps
const THRESHOLD = 55;
// how much of a too-small gesture still moves the page before springing back
const GIVE = 0.4;
const SPRING_BACK_MS = 220;
const JUMP_MS = 500;
// a mouse wheel notch jumps straight away, with a slightly quicker glide
const MOUSE_JUMP_MS = 420;
// wheel events this far apart belong to a new gesture
const GESTURE_GAP_MS = 150;
// after a jump, ignore everything for this long (the strongest momentum)
const COOLDOWN_MS = 300;

// mouse wheels report steps of 120 (or whole lines); trackpads report pixels
function isMouseWheel(event) {
  return (
    event.deltaMode === 1 ||
    (event.wheelDeltaY !== 0 && Math.abs(event.wheelDeltaY) % 120 === 0)
  );
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

// Mouse wheel and trackpad move the page section by section: a small scroll
// gives a little and springs back, a bigger one glides to the next section.
// Sections taller than the screen are stepped through one screen at a time.
// Touch screens, keyboard and links keep normal scrolling.
export default function useWheelSnap() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    let anchor = window.scrollY; // where the current gesture started
    let travelled = 0;
    let lastEvent = 0;
    let lastDelta = 0;
    let lastJump = -Infinity;
    const recent = []; // last few wheel speeds, to tell momentum from a new swipe
    let peak = 0;
    let slowedDown = false;
    let animating = false;
    let locked = false; // swallow the rest of a gesture after a jump
    let frame = 0;
    let springTimer = 0;

    function maxScroll() {
      return document.documentElement.scrollHeight - window.innerHeight;
    }

    function stops() {
      const header = document.querySelector("header")?.offsetHeight ?? 0;
      const list = [0, maxScroll()];
      document.querySelectorAll(".snap-section").forEach((el) => {
        let top = 0;
        for (let node = el; node; node = node.offsetParent)
          top += node.offsetTop;
        list.push(Math.min(Math.max(top - header, 0), maxScroll()));
      });
      return [...new Set(list.map(Math.round))].sort((a, b) => a - b);
    }

    function nextStop(from, dir) {
      const all = stops();
      const header = document.querySelector("header")?.offsetHeight ?? 0;
      const visible = window.innerHeight - header;
      const target =
        dir > 0
          ? (all.find((y) => y > from + 4) ?? maxScroll())
          : ([...all].reverse().find((y) => y < from - 4) ?? 0);
      // the hero is one stop: go straight between it and the first section
      if (target === 0 || from < 4) return target;
      // a section taller than the screen: show the rest of it first,
      // a screen at a time, unless only a sliver would be left out
      const hidden = Math.abs(target - from) - visible;
      if (hidden < 200) return target;
      const step = Math.min(hidden, visible * 0.9);
      return from + dir * step;
    }

    function animateTo(top, duration = JUMP_MS) {
      cancelAnimationFrame(frame);
      const start = window.scrollY;
      const distance = top - start;
      const begin = performance.now();
      animating = true;
      function tick(now) {
        const t = Math.min((now - begin) / duration, 1);
        window.scrollTo({
          top: start + distance * easeOutCubic(t),
          behavior: "instant",
        });
        if (t < 1) frame = requestAnimationFrame(tick);
        else {
          animating = false;
          anchor = top;
        }
      }
      frame = requestAnimationFrame(tick);
    }

    function onWheel(event) {
      // leave pinch-zoom and sideways swipes (back/forward) to the browser
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY))
        return;
      event.preventDefault();
      // the command palette is open: keep the page still
      if (document.documentElement.classList.contains("palette-open")) return;

      const now = performance.now();
      const delta = event.deltaMode === 1 ? event.deltaY * 40 : event.deltaY;
      // momentum streams contain empty events; they must not count as a new swipe
      if (delta === 0) return;
      const gap = now - lastEvent;
      const cooling = now - lastJump < COOLDOWN_MS;
      // momentum only ever slows down; a finger starting a new swipe speeds up
      recent.push(Math.abs(delta));
      if (recent.length > 5) recent.shift();
      // track the slow-down after a jump: only then can a speed-up be a new swipe
      peak = Math.max(peak, Math.abs(delta));
      if (Math.abs(delta) < peak * 0.6) slowedDown = true;
      const speedingUp =
        slowedDown &&
        recent.length === 5 &&
        recent.every((d, i) => i === 0 || d > recent[i - 1] * 1.1) &&
        recent[4] >= Math.max(recent[0] * 2, 6);
      const newGesture =
        gap > GESTURE_GAP_MS ||
        (!cooling && (Math.sign(delta) !== Math.sign(lastDelta) || speedingUp));
      lastEvent = now;
      lastDelta = delta;

      if (newGesture && !cooling) {
        locked = false;
        travelled = 0;
        peak = Math.abs(delta);
        slowedDown = false;
        if (!animating) anchor = window.scrollY;
      }
      if (locked || animating || cooling) return;

      travelled += delta;
      clearTimeout(springTimer);

      const mouse = isMouseWheel(event);
      if (mouse || Math.abs(travelled) >= THRESHOLD) {
        locked = true;
        travelled = 0;
        lastJump = now;
        peak = 0;
        slowedDown = false;
        animateTo(
          nextStop(anchor, Math.sign(delta)),
          mouse ? MOUSE_JUMP_MS : JUMP_MS,
        );
        return;
      }

      // not far enough yet: give a little, then spring back
      const given = Math.min(
        Math.max(anchor + travelled * GIVE, 0),
        maxScroll(),
      );
      window.scrollTo({ top: given, behavior: "instant" });
      springTimer = setTimeout(() => {
        travelled = 0;
        animateTo(anchor, 260);
      }, SPRING_BACK_MS);
    }

    // keep the anchor in sync after keyboard, link or touch scrolling
    function onScroll() {
      if (!animating && performance.now() - lastEvent > GESTURE_GAP_MS * 2)
        anchor = window.scrollY;
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(springTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
