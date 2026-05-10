+++
title = 'swm'
+++

**swm** is a client and daemon program for managing windows on macOS. It is inspired by [Yabai][yabai], using similar methods for maintaining window state without doing tiling window management itself.

The original **Stark** window manager started in 2016 with JavaScript-based configuration. **swm** is a newer implementation that moves away from maintaining a public JavaScript API mapping into Swift code.

[yabai]: https://github.com/asmvik/yabai

## Installation

The official way to install **swm** is via [Homebrew][brew].

    brew tap starkwm/formulae
    brew install starkwm/formulae/swm

You can then use `brew services` to run **swm** in the background.

    brew services start swm

It is also possible to compile **swm** from the [latest source][gh-swm]. This requires you to have the latest Xcode installed.

    git clone git@github.com:starkwm/swm.git
    cd swm
    make

The compiled binary is written to `.build/debug`. If you build from source, you will need to create a Launch Agent `.plist` file to run **swm** in the background.

[brew]: https://brew.sh
[gh-swm]: https://github.com/starkwm/swm

## Usage

**swm** runs as a daemon. Commands are sent to the daemon with `-m`/`--message`.

    swm --help
    swm --version

### Query

Use query commands to inspect the tracked displays, spaces, and windows. Add one selector to filter the result.

    swm -m query --displays
    swm -m query --spaces
    swm -m query --windows
    swm -m query --displays [--display <display-index>|--space <space-index>|--window <window-id>]
    swm -m query --spaces [--display <display-index>|--space <space-index>|--window <window-id>]
    swm -m query --windows [--display <display-index>|--space <space-index>|--window <window-id>]
    swm -m query --display [display-index]
    swm -m query --space [space-index]
    swm -m query --window <window-id>

Selector-only queries default to the matching result type: `--display` queries displays, `--space` queries spaces, and `--window` queries windows.

### Window

Use window commands to focus, minimize, move, resize, or place windows on a grid.

    swm -m window --focus [window-id|recent]
    swm -m window --minimize [window-id|recent]
    swm -m window --unminimize [window-id|recent]
    swm -m window --move [window-id|recent] abs:<x>:<y>
    swm -m window --resize [window-id|recent] abs:<width>:<height>
    swm -m window --grid [window-id|recent] <columns>:<rows>:<x>:<y>:<width>:<height>

Use `rel:<x>:<y>` with `--move` or `rel:<width>:<height>` with `--resize` for relative changes.

### Space

Use space commands to change padding and gap settings for the active space.

    swm -m space --toggle padding
    swm -m space --toggle gap
    swm -m space --padding abs:<top>:<right>:<bottom>:<left>
    swm -m space --gap abs:<number>

Use `rel:` instead of `abs:` for relative padding and gap changes.

### Config

Use config commands to update defaults for all spaces.

    swm -m config window-gap <number>
    swm -m config top-padding <number>
    swm -m config right-padding <number>
    swm -m config bottom-padding <number>
    swm -m config left-padding <number>

### Keyboard Shortcuts

**swm** does not bind keyboard shortcuts itself. Use a key binding daemon like [skbd][skbd] to run `swm` commands from shortcuts.

    hyper + h: swm -m window --grid 2:1:0:0:1:1
    hyper + l: swm -m window --grid 2:1:1:0:1:1
    hyper + f: swm -m window --grid 1:1:0:0:1:1
    hyper + r: swm -m window --focus recent

[skbd]: /skbd@2/

## Configuration

**swm** is configured by a single file, `~/.config/swm/swmrc`. This file should be an executable shell script. You can call the `swm` binary to configure options.

### Window Gaps

You can use `swm -m config window-gap <number>` to configure the size of the gap between windows when using the `swm -m window --grid` command.

### Padding

You can use the following commands to configure the padding around each edge of a macOS space.

- `swm -m config top-padding <number>`
- `swm -m config right-padding <number>`
- `swm -m config bottom-padding <number>`
- `swm -m config left-padding <number>`
