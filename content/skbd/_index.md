+++
title = 'skbd'
description = 'A keyboard shortcut daemon for macOS built on Quartz Event Services.'
homeSummary = 'Keyboard shortcuts for shell commands'
homeDetails = 'Bind key combinations to shell commands, with support for left and right modifier keys. Configuration reloads as you edit it. Use it to launch apps, run scripts, or trigger swm commands from the keyboard.'
weight = 30
+++

skbd runs shell commands when you press configured keyboard shortcuts. It uses [Quartz Event Services][quartz] to monitor key presses on macOS and can distinguish left and right modifier keys.

[quartz]: https://developer.apple.com/documentation/coregraphics/quartz-event-services

## Installation

Install skbd with [Homebrew][brew].

    brew tap starkwm/formulae
    brew install starkwm/formulae/skbd@2

Create a configuration file, then start skbd as a launchd service with `brew services`.

    brew services start skbd@2

To build skbd from the [latest source][gh-skbd], install the latest Xcode and macOS SDK.

    git clone https://github.com/starkwm/skbd.git
    cd skbd
    make

If you build from source, you will need to create a Launch Agent `.plist` file to run skbd in the background.

[brew]: https://brew.sh
[gh-skbd]: https://github.com/starkwm/skbd

## Configuration

Configure `skbd` with a single file or a directory of files. It reads `~/.config/skbd/skbdrc` by default. If the configured path points to a directory, `skbd` loads all non-hidden regular files in that directory in lexicographical filename order. Use `-c/--config` to select another path.

`skbd` reloads the configuration when you edit it. You do not need to restart the daemon. If the configured path is a symlink, `skbd` watches both the symlink location and the resolved target, so editing the target or repointing the symlink reloads the configuration. For a directory configuration, `skbd` reloads when files in the directory are edited, added, removed, or renamed.

If a changed configuration cannot be loaded or parsed, `skbd` prints an error and keeps using the last valid configuration.

To bind a command, specify its modifier keys and key.

```
cmd + shift - k: open -a iTerm
```

By default, `skbd` consumes the key event after executing the command. To allow the key press to pass through to the application, use `->` instead of `:`.

```
cmd + shift - k -> open -a iTerm
```

`skbd` runs commands with the shell in `$SHELL`, or `/bin/bash` if it is unset. End a line with `\` to continue a command on the next line.

```
ctrl + shift - enter:
    osascript -e 'if application "Ghostty" is running then' \
              -e '  tell application "System Events"' \
              -e '    click menu item "New Window" of menu "File" of menu bar 1 of process "Ghostty"' \
              -e '  end tell' \
              -e 'else' \
              -e '  tell application "Ghostty" to activate' \
              -e 'end if' > /dev/null
```

### Comments

Start a line with `#` to add a comment.

### Modifiers

Available modifiers:

- `shift`
- `ctrl`
- `opt`/`alt`
- `cmd`
- `meh`
- `hyper`
- `fn`

Prefix `shift`, `ctrl`, `alt`, or `cmd` with `l` or `r` to select the left or right modifier key.

`meh` combines `shift`, `ctrl`, and `alt`.

`hyper` combines `shift`, `ctrl`, `alt`, and `cmd`.

`fn` is the Function or Globe key.

### Keys

The available key values are:

- `return`
- `tab`
- `space`
- `backspace`
- `escape`
- `backtick`
- `delete`
- `home`
- `end`
- `pageup`
- `pagedown`
- `insert`
- `left`
- `right`
- `up`
- `down`
- `f1` to `f20`
- `a` to `z`
- `0` to `9`
- `` ` ``, `-`, `=`, `[`, `]`, `'`, `;`, `\\`, `,`, `.`, `/`

### Block list

Add process names to `.blocklist` to disable shortcuts while one of those processes is frontmost.

```
.blocklist [
  "Ghostty"
  "Finder"
]
```

In this example, skbd does not run shortcuts while Ghostty or Finder is frontmost.
