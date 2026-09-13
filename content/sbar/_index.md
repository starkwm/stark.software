---
title: "sbar"
description: "Configure sbar for macOS."
showDocList: false
weight: 40
homeSummary: "A configurable status bar for macOS"
homeDetails: "Show system information, media, and workspaces using native providers. Add shell commands and streaming plugins, then style the bar with JSON."
---

Configure your macOS status bar with native providers, shell commands, and streaming plugins.

## Start here

1. [Create a configuration](/sbar/configuration/) and arrange items across your displays.
2. [Browse providers](/sbar/providers/) to compare their output, update behaviour, and options.
3. [Customise labels with text templates](/sbar/configuration/text-templates/).
4. [Style your items](/sbar/configuration/appearance/) and [control updates](/sbar/configuration/refresh/).

## Requirements and installation

sbar requires macOS 26 or later. Building from source requires Xcode 26 or later with Swift 6.2.

```sh
git clone https://github.com/starkwm/bar.git
cd bar
make build
```

Use `make release` for an optimised build in `.build/release`. The `sbar` executable is self-contained. Copy it to a directory on your `PATH` to use the CLI commands.

The commands in this reference assume `sbar` is on your `PATH`. From the source repository, add the debug build for the current terminal session:

```sh
export PATH="$PWD/.build/debug:$PATH"
```

For later sessions, add the absolute directory containing `sbar` to your shell's `PATH`. You can also use `.build/debug/sbar` from the source repository whenever an example calls `sbar`.

Source builds do not install a login service. To start the bar at login, create a Launch Agent that runs the executable by its absolute path. Commands and plugins inherit that process's environment, so use absolute executable paths or configure its `PATH` explicitly.

## A minimal bar

Create the configuration directory:

```sh
mkdir -p ~/.config/sbar
```

Save this as `~/.config/sbar/config.json`, then run `sbar`:

```json
{
  "schemaVersion": 1,
  "bar": {},
  "items": {
    "left": [
      { "id": "app", "type": "frontApplication" }
    ],
    "right": [
      { "id": "battery", "type": "battery" },
      { "id": "clock", "type": "datetime", "format": "HH:mm" }
    ]
  }
}
```

sbar reloads the file automatically. If an edit is invalid, it keeps the last valid configuration. Run `sbar validate` to check your file, or `sbar query --diagnostics` to inspect errors. Stop the bar with `sbar stop`. See [runtime commands](/sbar/configuration/refresh/#runtime-commands) for custom configuration paths and control sockets.

## A styled bar {#app-icons-battery-state-and-localized-date-and-time}

This configuration shows the menu-bar owner's native icon, battery state colours, and localised date and time. SF Symbols use a bold weight while text keeps its default regular weight.

```json
{
  "schemaVersion": 1,
  "bar": {},
  "theme": {
    "itemStyle": { "symbolFontWeight": "bold" }
  },
  "items": {
    "left": [
      {
        "id": "app",
        "type": "frontApplication",
        "symbol": "app",
        "frontApplication": { "showIcon": true }
      }
    ],
    "right": [
      {
        "id": "battery",
        "type": "battery",
        "battery": {
          "symbols": { "pluggedIn": "powerplug" },
          "tints": { "low": "#FF6655", "charging": "#66CC88" }
        }
      },
      {
        "id": "datetime",
        "type": "datetime",
        "dateStyle": "medium",
        "timeStyle": "short"
      }
    ]
  }
}
```

The app's `symbol` is a fallback if its native icon is unavailable. Battery icons appear by default; this battery block adds state colours and sets the plugged-in symbol. On battery power, the low-battery colour applies at 20% or below by default. Date and time styles follow the system locale. See [application icons](/sbar/providers/frontapplication/), [battery appearance](/sbar/providers/battery/), and [date and time](/sbar/providers/datetime/) for more options.

## About this reference

This reference was checked against the sbar source and documentation on 12 September 2026. Values and date formats depend on your Mac and system locale. [Download the configuration schema](/sbar/config.schema.json).
