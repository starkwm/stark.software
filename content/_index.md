---
description: Open-source macOS productivity tools built for fast, intentional desktop workflows.
---

**Stark Software** is a collection of [open-source][starkwm] macOS apps designed to boost productivity. Each app started as a solution to a problem I personally faced.

## How it started

I built the first version of **Stark** in [early 2016][first-commit] while learning Swift. It started as a tool I wanted for myself — something that made managing windows on macOS feel fast, intentional, and effortless.

Because macOS doesn’t offer native window management APIs in the SDK, **Stark** is powered by a combination of the [Accessibility API][ax-api] and carefully used private frameworks. Over the past decade, it has evolved continuously — refined through real‑world use, and inspired by the [incredible open‑source][amethyst] macOS [window manager community][yabai].

## Why swm exists

After years of maintaining **Stark** as a JavaScript-configurable app, I wanted a smaller foundation for window management — something closer to a system tool than an application framework. **swm** is that lower-level piece: a daemon that tracks displays, spaces, and windows, plus a command line interface for querying and controlling them.

It keeps the useful parts of scriptable window management while moving away from a public JavaScript API mapped directly into Swift code. The result is a tool that fits better into shell scripts, launch agents, and keyboard-driven workflows.

## Why skbd exists

Window management only feels fast when the controls are immediate. **skbd** grew out of that need: a small daemon for binding key combinations to shell commands, built specifically for macOS and able to distinguish left and right modifier keys.

Together, **skbd** and **swm** form a more modular version of the original idea behind **Stark**. One tool listens for intent from the keyboard, the other applies that intent to the desktop.

[starkwm]: https://github.com/starkwm
[first-commit]: https://github.com/starkwm/stark/commit/7cfb1e2339bdb454e158b3e8c0b9fc8ca846f8ed
[ax-api]: https://developer.apple.com/documentation/accessibility/accessibility-api
[amethyst]: https://github.com/ianyh/Amethyst
[yabai]: https://github.com/asmvik/yabai
