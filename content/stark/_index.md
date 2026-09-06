+++
title = 'Stark'
description = 'A macOS window manager configured in JavaScript.'
homeSummary = 'Window management in JavaScript'
homeDetails = 'Write a stark.js file to move and resize windows, control applications, and bind keyboard shortcuts with the JavaScript API.'
weight = 10
+++

Stark is a window manager for macOS. Use its JavaScript API to create keyboard shortcuts that control windows and applications.

## Installation

Install Stark with [Homebrew][brew].

    brew install starkwm/formulae/stark

Launch Stark, grant it Accessibility permission, then restart it. Enable _Launch at login_ in its menu to start it when you log in.

The Homebrew tap also has an unstable _tip_ build.

    brew install starkwm/formulae/stark@tip

This build uses the latest source from the [GitHub repository][gh-stark] at the time of the build. It is not updated nightly.

[brew]: https://brew.sh
[gh-stark]: https://github.com/starkwm/stark

## Configuration

Configure Stark with a `stark.js` file in one of these locations.

- `~/.stark.js`
- `~/.config/stark/stark.js`
- `~/Library/Application Support/Stark/stark.js`

Stark loads the first file it finds in the order above.

Enable logging from the menu bar icon to write debug output to `~/.stark.log`. This includes calls to `print` in your configuration.

See the [API reference][api-docs] for available methods, or [Tom's configuration][tom-config] for an example of manual window management.

[api-docs]: /stark/api/
[tom-config]: https://github.com/tombell/dotfiles/blob/main/tag-macos/config/stark/stark.js
