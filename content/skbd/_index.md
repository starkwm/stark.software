+++
title = 'skbd'
description = 'A keyboard shortcut daemon for macOS built on Quartz Event Services.'
homeSummary = 'Keyboard shortcuts for shell commands'
weight = 30
+++

**skbd** is a daemon application for macOS that uses [Quartz Event Services][quartz] to monitor key presses, then look up those against configured hot keys. It can differentiate left and right modifier keys.

[quartz]: https://developer.apple.com/documentation/coregraphics/quartz-event-services

## Installation

The official way to install **skbd** is via [Homebrew][brew].

    brew tap starkwm/formulae
    brew install starkwm/formulae/skbd@2

You can then use `brew services` to start **skbd** as a _launchd_ service, once you have a configuration file.

    brew services start skbd@2

It is also possible to compile **skbd** from the [latest source][gh-skbd]. This requires you to have the latest Xcode and macOS SDK installed.

    git clone https://github.com/starkwm/skbd.git
    cd skbd
    make

If you build from source, you will need to create a Launch Agent `.plist` file to run **skbd** in the background.

[brew]: https://brew.sh
[gh-skbd]: https://github.com/starkwm/skbd

## Configuration

`skbd` can be configured using a single file, or a directory of multiple files. By default `~/.config/skbd/skbdrc` is used. If the configured path points to a directory, `skbd` loads all non-hidden regular files in that directory in lexicographical filename order. The path can be overridden using the `-c/--config` flag.

The configuration is reloaded automatically while `skbd` is running. For a single file, changes to the file are picked up without restarting `skbd`. If the configured path is a symlink, `skbd` watches both the symlink location and the resolved target, so editing the target or repointing the symlink reloads the configuration. For a directory configuration, `skbd` reloads when files in the directory are edited, added, removed, or renamed.

If a changed configuration cannot be loaded or parsed, `skbd` prints an error and keeps using the last valid configuration.

You can declare key binds by specifying one or more modifier keys and the key to bind to a command.

```
cmd + shift - k: open -a iTerm
```

By default, the key event is consumed after executing the command. To allow the key press to pass through to the application, use `->` instead of `:`.

```
cmd + shift - k -> open -a iTerm
```

The command will be executed using the shell defined by the `$SHELL` environment variable, falling back to `/bin/bash` if not set. Commands can be split over multiple lines by using a `\` at the end of the line.

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

Comments can be added to the configuration file with lines starting with `#`.

### Modifiers

The available modifiers values are:

- `shift`
- `ctrl`
- `opt`/`alt`
- `cmd`
- `meh`
- `hyper`
- `fn`

The `shift`, `ctrl`, `alt`, and `cmd` modifiers can be prefixed with `l` or `r` to specify the left or right modifier key on the keyboard.

The `meh` modifier key, is a shortcut for using `shift`, `control`, and `alt` all together.

The `hyper` modifier key, is a shortcut for using `shift`, `control`, `alt`, and `command` all together.

The `fn` modifier key, which is the "globe" key.

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

### Block List

You can specify a list of processes to ignore shortcuts when that process is the front-most process.

```
.blocklist [
  "Ghostty"
  "Finder"
]
```

When the specified process is the current front-most process, any matching shortcuts will not execute the command.
