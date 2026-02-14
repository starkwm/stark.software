+++
title = 'Stark API Documentation'
+++

**Stark** provides a JavaScript API for configuring your window management.

The classes below are available in the global scope. Static methods will be accessible on the global object, and the instance methods and fields available on objects returned from static methods.

There is a global `print` function available to aid with debugging.

## Application

`Application` is used for interacting with running applications. References to an application can become stale if the application is terminated, use `isTerminated` to check.

### Static Methods

- **all()**: Return all running applications
- **focused()**: Return the focused application
- **find(string)**: Return the application with the given name

### Instance Methods

- **windows()**: Return all knowwn winodws for the application
- **activate()**: Activate the application, bringing all windows forward
- **focus()**: Activate the application, bringing the main window forward
- **show()**: Show the application
- **hide()**: Hide the application
- **terminate()**: Quit the application

### Instance Fields

- **name**: Name of the application
- **bundleID**: Bundle ID of the application
- **processID**: Process ID of the running application
- **isFrontmost**: Whether the application is currently the frontmost application
- **isHidden**: Whether the application is hidden
- **isTerminated**: Whether the application is terminated

## Window

`Window` is used for interacting with application windows. A window is displayed on a screen within a rectangle. Their position can be alterated by giving coordinates to a point within the rectangle.

### Static Methods

- **all()**: Return all known windows
- **focused()**: Return the focused window

### Instance Methods

- **setFrame([rect](#rectangle))**: Set the top left point, and size of the window
- **setTopLeft([point](#point))**: Set the top left point of the window
- **setSize([size](#size))**: Set the size of the window
- **setFullScreen(boolean)**: Set whether the window should be fullscreen
- **minimize()**: Minimize the window
- **unminimize()**: Unminimize the window
- **focus()**: Focus the window
- **spaces()**: Return the spaces that contain the window

### Instance Fields

- **id**: Unique identifier for the window
- **application**: Application the window belongs to
- **screen**: Screen the window is on
- **title**: Title of the window
- **frame**: Top left point and size of the window
- **topLeft**: Top left point of the window
- **size**: Size of the window
- **isStandard**: Whether the window is a standard window
- **isMain**: Whether the window is the main application window
- **isFullscreen**: Whether the window is fullscreen
- **isMinimized**: Whether the window is minimized

## Screen

`Screen` is used for interacting with a display's frame size, and other screens when using multiple screens.

### Static Methods

- **all()**: Return all screens
- **focused()**: Return the focused screen

### Instance Methods

- **spaces()**: Return all spaces for the screen
- **currentSpace()**: Return the current space for the screen

### Instance Fields

- **id**: Unique identifier for the screen
- **flippedFrame**: Top left point and size of the screen
- **flippedVisibleFrame**: Top left point and size of the screen, adjusted for when the dock and menu bar are visible
- **next**: Next screen
- **previous**: Previous screen

## Space

`Space` is used for interacting with mission control spaces. Due to changes in newer macOS versions, this functionality has been become less useful as we're unable to move windows programmatically between spaces now.

### Static Methods

- **all()**: Return all spaces
- **at(number)**: Return the space at the given index
- **active()**: Return the currently active space

### Instance Methods

- **screens()**: Return all screens the space is on
- **windows()**: Return all windows on the space

### Instance Fields

- **id**: Unique identifier for the space
- **isNormal**: Whether the space is a non-fullscreen space
- **isFullscreen**: Whether the space is a fullscreen space

## Keymap

`Keymap` is used for registering shortcuts with a callback function.

### Static Methods

- **on(string, string[], () => void)**: Register the given key, modifiers combination, and callback function
- **off(string)**: Unregister the keymap with the given identifier

### Instance Fields

- **id**: Unique identifier for the keymap
- **key**: Key for the keymap
- **modifiers**: Modifiers for the keymap

## Types

These are types that are returned by methods and fields, or as arguments to method calls.

### Rectangle

- **x**
- **y**
- **width**
- **height**

### Point

- **x**
- **y**

### Size

- **width**
- **height**
