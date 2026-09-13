---
title: "Shared item options"
description: "Identity, layout, actions, and the options shared by providers."
weight: 2
---

Place items in `items.left`, `items.center`, or `items.right` in display order. Omitted sections are empty. Item snippets on provider pages belong inside one of these arrays.

## Properties

| Property | Default | Description |
| --- | --- | --- |
| `id` | Required | Nonblank string, unique across all sections and nested children. |
| `type` | Required | One of the [documented item types](/sbar/providers/). |
| `enabled` | `true` | Disable an item; disabled containers also disable their child providers. |
| `text` | - | [Text template](/sbar/configuration/text-templates/) or fixed string; sets the displayed label. Empty text hides the label; omitted or `null` preserves it. Not supported by groups, dividers, or spacers. |
| `symbol` | - | SF Symbol name or font glyph object. Use [template symbol conditions](/sbar/configuration/text-templates/#symbols-visibility-and-accessibility) to control when it appears. Ignored by groups, dividers, and spacers. With `frontApplication.showIcon`, it is a fallback when the native icon is unavailable. |
| `symbolPosition` | `left` | `left` or `right`; places symbols and application icons on that side of the text. `null` uses the default. See [symbol placement](/sbar/configuration/appearance/#symbol-placement). |
| `priority` | `0` | Integer. Higher values stay visible longer during overflow. |
| `style` | Inherit theme | [Colours, hover appearance, font, padding, corners, and widths](/sbar/configuration/appearance/). |
| `refresh` | Provider behaviour | [Event, interval, or manual snapshots](/sbar/configuration/refresh/). |
| `primaryAction` | - | Action on click. |
| `secondaryAction` | - | Action in the context menu. |
| `popup` | - | Text to show in a popover. |
| `format` | - | [Date and time](/sbar/providers/datetime/) Unicode pattern; nonempty values override both styles. |
| `dateStyle` | `none` | Localised date style for `datetime`: `none`, `short`, `medium`, `long`, or `full`. |
| `timeStyle` | `short` | Localised time style for `datetime`: `none`, `short`, `medium`, `long`, or `full`. |
| `children` | Empty | Items for a group or popup. |
| `frontApplication` | - | [Native application icon](/sbar/providers/frontapplication/) configuration. |
| `aerospace`, `audioDevice`, `battery`, `bluetooth`, `cpu`, `disk`, `media`, `memory`, `network`, `spaces`, `throughput`, `volume`, `vpn`, `yabai` | - | Provider settings for data, appearance, and visibility. |
| `command`, `plugin` | - | Required process settings for the corresponding type. |

The [Mail provider](/sbar/providers/mail/) uses shared item options only; it has no dedicated configuration block.

## Actions

Set `primaryAction` to run an action on click, or `secondaryAction` to add it to the context menu. Each action needs a `kind` and `value`. The kind can be `command`, `url`, or `application`. URL actions allow HTTP, HTTPS, and mailto. Application values are bundle IDs or paths. URL and application paths support `${NAME}` and `~` expansion. Shell actions use `/bin/sh -c` and inherit the environment.

```json
{
  "id": "settings",
  "type": "text",
  "primaryAction": {
    "kind": "application",
    "value": "com.apple.systempreferences"
  },
  "secondaryAction": {
    "kind": "command",
    "value": "open -a 'Activity Monitor'"
  },
  "text": "Settings"
}
```

Shell actions have a five-second timeout and a 64 KB combined stdout/stderr limit. They do not display command output in the item; use a [command item](/sbar/providers/command/) for that. Inspect action failures with `sbar query --diagnostics`.

If an item has both a primary action and a popover, clicking it runs the action and opens or closes the popover. Groups render inline children, so put primary actions on the child items.

Items with either action or a popup show a hover highlight. Set [hover colours](/sbar/configuration/appearance/#hover-colours) to customise their text, symbols, and background.

## Containers and overflow

`group` items render `children` inline. `popup` items show `children` when clicked; any item can also have a `popup` text string. Groups nest up to eight levels. Disabling a group disables its child providers.

A popup's visible label defaults to its item ID. Child providers run while the container is enabled, even when its popover is closed. A container's `style` applies to the container itself. Use `theme.itemStyle` for child defaults and each child's `style` for overrides.

Set `symbolPosition` on each child that needs it. Children do not inherit their container's placement.

```json
{
  "id": "system",
  "type": "popup",
  "children": [
    {
      "id": "cpu",
      "type": "cpu"
    },
    {
      "id": "memory",
      "type": "memory"
    }
  ],
  "text": "System"
}
```

### Overflow

Disabled items and items hidden by their provider take no layout space or inter-item spacing and do not appear in overflow. Hidden children are also excluded from groups and popovers. Items hidden by a provider keep updating while enabled, so they can reappear when their state changes.

Each region measures its items, allows flexible text to compress, and moves low-priority items into an overflow popover when space runs out. Larger `priority` values remain visible longer; equal priorities hide from the end. On displays without a notch, the centre reserves one third of the bar when populated. Beside a notch, the centre and right sections share the usable right-hand area. Bar content stays clipped within its own region.

[`style.minWidth` and `style.width`](/sbar/configuration/appearance/#item-widths) reserve space during overflow selection. Fixed-width items retain that width; their long labels truncate instead of shrinking the reserved space.

### Dividers and spacers

A `divider` draws a vertical separator. A `spacer` adds flexible empty space. Both require an `id` and `type`, and neither displays a label or symbol:

```json
{
  "schemaVersion": 1,
  "bar": {},
  "items": {
    "left": [
      {
        "id": "title",
        "type": "text",
        "text": "Work"
      },
      {
        "id": "gap",
        "type": "spacer"
      },
      {
        "id": "separator",
        "type": "divider"
      },
      {
        "id": "app",
        "type": "frontApplication"
      }
    ]
  }
}
```
