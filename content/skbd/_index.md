+++
title = 'skbd'
+++

**skbd** is a simple daemon application for macOS for mapping shell commands to global keyboard shortcuts.

## Installation

The official way to install **skbd** is via [Homebrew][brew].

    brew install starkwm/formulae/skbd

You can then use `brew services` to start **skbd** as a _launchd_ service, once you have a configuration file.

    brew services start skbd

It is also possible to compile **skbd** from the [latest source][gh-stark]. This requires you to have the latest Xcode installed.

    brew install starkwm/formulae/skbd --HEAD

[brew]: https://brew.sh
[gh-stark]: https://github.com/starkwm/skbd.old

## Configuration

Soon...
