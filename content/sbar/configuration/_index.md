---
title: "Configuration"
description: "One JSON file controls the entire bar."
showDocList: false
weight: 1
---

By default, sbar looks for `~/.config/sbar/config.jsonc`, then `~/.config/sbar/config.json`. Edit either file and sbar reloads it when the file changes. If neither file exists, the bar shows the application owning the menu bar, a divider, and a clock. Removing the active file restores that default bar. If an edit is invalid, sbar keeps the last valid configuration. If the file is invalid at startup, it uses the default bar.

Inspect errors with `sbar query --diagnostics`. Valid reloads preserve unchanged native providers and [refresh snapshots](/sbar/configuration/refresh/#configuration-reloads).

Run `sbar validate` to check the file without starting the bar. To check another file, use `sbar validate --config /path/to/config.jsonc`. Invalid or missing files produce an error and a nonzero exit status. Validation never writes the file. Use `sbar start --config /path/to/config.jsonc` to run with another configuration.

Configuration files accept `//` line comments, `/* ... */` block comments, and trailing commas in objects and arrays. sbar removes them in memory before decoding. It does not change the file, and comment markers inside strings remain literal text. Block comments cannot nest.

Both `.jsonc` and `.json` files accept this syntax. `sbar start` and `sbar validate` prefer `config.jsonc` when both default files exist. If `config.jsonc` is invalid, sbar reports the error instead of falling back to `config.json`.

```jsonc
{
  "schemaVersion": 1,
  // Leave room for the menu bar.
  "bar": { "margin": { "top": 40, }, },
  "items": {
    "right": [
      /* Use a 24-hour clock. */
      { "id": "clock", "type": "datetime", "format": "HH:mm", },
    ],
  },
}
```

Save persistent changes in the configuration file. sbar never writes to the file or backs it up. For editor completion, copy [config.schema.json](/sbar/config.schema.json) beside your configuration and add `"$schema": "config.schema.json"` to the root object.

The [Everyday bar](https://github.com/starkwm/bar/tree/main/examples/everyday) includes native application icons, media shown only during playback, weather, system metrics, unread Mail counts, and connection and audio-device popovers. It uses [text templates](/sbar/configuration/text-templates/) for labels, plus hover colours and minimum widths for its CPU and memory items. The [floating bar](https://github.com/starkwm/bar/tree/main/examples/floating) has fewer items, inset edges, and rounded corners. The [sections example](https://github.com/starkwm/bar/tree/main/examples/sections) gives the left, centre, and right regions separate backgrounds and borders.

## Example

Create `~/.config/sbar/config.jsonc` with a configuration such as:

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

The root object requires `schemaVersion`, `bar`, and `items`. Only `schemaVersion: 1` is supported. An empty `bar` uses the default bar settings; an empty `items` displays no items. Add an optional `theme` for [bar and item appearance](/sbar/configuration/appearance/).

Use the shared [`text` field](/sbar/configuration/text-templates/) to customise labels with provider values and conditional sections. Provider defaults apply when `text` is omitted.

Provider configuration blocks must match the item's `type`. For example, an `audioDevice` block belongs on an `audioDevice` item. Validation also checks disabled items and children. Use `sbar validate` alongside editor schema checks to catch duplicate IDs and other constraints that depend on multiple values.

## Bar settings

| Property | Default | Description |
| --- | --- | --- |
| `position` | `top` | `top` or `bottom`. |
| `height` | `32` | 20 to 96 points, including content padding. |
| `margin` | All `0` | Object with `top`, `bottom`, `left`, `right` offsets, each from 0 to 4096 points. |
| `displays` | `all` | `main`, `all`, or `selected`. |
| `displayIDs` | None | Display IDs, required when `displays` is `selected`. |
| `windowLevel` | `floating` | `floating`, `statusBar`, or `screenSaver`; `null` uses the default. |
| `shadow` | `false` | Enable a native window shadow or a fade along the bar's edge. `null` also uses the default. See [shadows](#shadows). |
| `mousePassThrough` | `false` | Pass mouse events through empty regions. |

`main` selects the primary display. Use `sbar query --displays` to find connected display IDs and names.

The default `floating` window level keeps the bar above ordinary windows and below system notifications and the revealed menu bar. Explicit `statusBar` and `screenSaver` levels can cover notifications, especially when the menu bar auto-hides and banners overlap the bar.

A top bar sits at the physical screen edge and shares the system menu-bar area. A bottom bar stays within the Dock's visible work area. On notched displays, items avoid the cutout and the centre section sits immediately to its right.

The bar does not hide the system menu bar or reserve space for application windows. Set a gap in your window manager and adjust the bar's margins to avoid overlap.

### Space transitions

Panels follow display and Space changes. sbar uses a shared Space to keep panels visible during desktop transition animations. This uses private macOS SkyLight APIs, independently of the [Spaces provider](/sbar/providers/spaces/). If those APIs are unavailable or the shared Space cannot be created, the bar logs a warning and keeps its normal AppKit window behaviour.

## Floating bar

To create a floating bar, add margins and rounded corners:

```json
{
  "schemaVersion": 1,
  "bar": {
    "height": 40,
    "shadow": true,
    "margin": { "top": 44, "left": 12, "right": 12 }
  },
  "theme": {
    "horizontalPadding": 16,
    "verticalPadding": 4,
    "cornerRadius": 12
  },
  "items": { "right": [{ "id": "clock", "type": "datetime", "format": "HH:mm" }] }
}
```

Margins shrink the area available to the bar. Top bars sit at the top of that area, and bottom bars sit at the bottom. Left and right margins control width independently. sbar limits excessive margins to leave at least one point of available space and reduces the height to fit. The top margin starts at the physical screen edge. Leave enough room for your display's notch and menu bar. Notch avoidance stops once the panel is below the cutout. These settings reload automatically when the configuration file changes.

The theme's `verticalPadding` and `cornerRadius` accept 0 to 48 points and default to zero. Padding sits inside `bar.height`. The rounded corners clip the content and background, whether you use the system material or a custom colour.

## Shadows

Set `bar.shadow` to `true` to enable a shadow. Inset or rounded bars use the native macOS window shadow. macOS controls its colour, blur, and offset.

Square bars spanning the display's full width use a soft 16-point fade below a top bar or above a bottom bar. The fade shortens at the screen edge. It uses extra transparent window space that passes clicks through, so the shadow does not change the configured bar height, content position, or mouse hit regions.

Shadow changes reload with the configuration, including changes to the margins, background, and corner radius.
