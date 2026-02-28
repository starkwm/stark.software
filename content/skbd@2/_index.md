+++
title = 'skbd (v2)'
+++

**skbd** (v2) is a rewrite from scratch of my first version of **skbd**. It utilises the [Quartz Event Services][quartz] to monitor key presses, then look up those against configured hot keys. This has many benefits over the old method that the original **skbd** used, including being able to differentiate left and right modifier keys.

[quartz]: https://developer.apple.com/documentation/coregraphics/quartz-event-services

## Installation

The official way to install **skbd** is via [Homebrew][brew].

    brew install starkwm/formulae/skbd@2

You can then use `brew services` to start **skbd** as a _launchd_ service, once you have a configuration file.

    brew services start skbd@2

It is also possible to compile **skbd** from the [latest source][gh-stark]. This requires you to have the latest Xcode installed.

    brew install starkwm/formulae/skbd@2 --HEAD

[brew]: https://brew.sh
[gh-stark]: https://github.com/starkwm/skbd.next

## Configuration

Soon...
