+++
title = 'Stark'
+++

**Stark** is a window manager for macOS. It is powered by a JavaScript API that let's users create their own shortcuts for maanging their windows and applications.

## Installation

The official way to install **Stark** is via [Homebrew][brew].

    brew install starkwm/formulae/stark

You can then launch **Stark** and grant it accessibility permissions, and restart it. If you would like **Stark** to run when you log in. You can enable the _Launch at login_ menu item.

There is also a _tip_ version of **Stark** available in the Homebrew tap.

    brew install starkwm/formulae/stark@tip

This is an unstable build of **Stark**, built from the current tip of the [GitHub repository][gh-stark]. It is _not_ updated nightly.

[brew]: https://brew.sh
[gh-stark]: https://github.com/starkwm/stark

## Configuration

You configure **Stark** with a `stark.js` configuration file. This file can live in one of three locations.

- `~/.stark.js`
- `~/.config/stark/stark.js`
- `~/Library/Application Support/Stark/stark.js`

The first file found will be the configuration that is loaded.

From the menu bar icon, logging can also be enabled which loads debug information to `~/.stark.log`. Enabling this is useful when you're using the `print` function in your configuration.

The full [API documentation][api-docs] is available. You can see [Tom's configuration][tom-config] as an example of configuring **Stark** with simple manual window management.

[api-docs]: /stark/api/
[tom-config]: https://github.com/tombell/dotfiles/blob/main/tag-macos/config/stark/stark.js
