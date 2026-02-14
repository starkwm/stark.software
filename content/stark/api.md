+++
title = 'Stark API Documentation'
+++

API documentation for Stark.

```javascript {linenos=inline}
const grid = (c, r, w, h, x, y) => {
  const win = Window.focused();
  if (!win) return;

  if (x >= c) x = c - 1;
  if (y >= r) y = r - 1;

  if (w <= 0) w = 1;
  if (h <= 0) h = 1;

  if (w > c - x) w = c - x;
  if (h > r - y) h = r - y;

  const bounds = win.screen.flippedVisibleFrame;

  bounds.x += padding;
  bounds.width -= padding * 2;
  bounds.y += padding;
  bounds.height -= padding * 2;

  if (x > 0) {
    bounds.x += gap;
    bounds.width -= gap;
  }

  if (y > 0) {
    bounds.y += gap;
    bounds.height -= gap;
  }

  if (c > x + w) bounds.width -= gap;
  if (r > y + h) bounds.height -= gap;

  const cw = bounds.width / c;
  const ch = bounds.height / r;
  const fx = bounds.x + bounds.width - cw * (c - x);
  const fy = bounds.y + bounds.height - ch * (r - y);
  const fw = cw * w;
  const fh = ch * h;

  win.setFrame({ x: fx, y: fy, width: fw, height: fh });
};

const moveAndResizeWindow = (key, mods, ...args) =>
  Keymap.on(key, mods, () => grid(...args));

moveAndResizeWindow("c", ctrlShift, 12, 10, 12, 10, 0, 0); // Centre full
moveAndResizeWindow("x", ctrlShift, 12, 10, 10, 8, 1, 1); // Centre medium
moveAndResizeWindow("z", ctrlShift, 12, 10, 8, 6, 2, 2); // Centre small

moveAndResizeWindow("h", shiftOpt, 12, 10, 8, 10, 0, 0); // Left-two thirds
moveAndResizeWindow("h", ctrlOpt, 12, 10, 4, 10, 0, 0); // Left-one third
moveAndResizeWindow("h", ctrlShift, 12, 10, 6, 10, 0, 0); // Left-half

moveAndResizeWindow("l", shiftOpt, 12, 10, 8, 10, 4, 0); // Right-two thirds
moveAndResizeWindow("l", ctrlOpt, 12, 10, 4, 10, 8, 0); // Right-one third
moveAndResizeWindow("l", ctrlShift, 12, 10, 6, 10, 6, 0); // Right-half
```
