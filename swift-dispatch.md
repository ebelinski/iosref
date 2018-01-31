---
layout: default
title: Swift 4 guide&colon; dispatch
description: ...
redirect_from:
  - "dispatch"
---

Dispatch is a framework that allows you to run code on different threads. By default, all code on iOS is run on the **main thread** (also known as the **UI thread**). If a very long function that takes 5 seconds is run on the main thread, the app freezes for 5 seconds, and the user cannot 

To fix this, the time-intensive function can run on a background thread. When it's done, the UI can be updated on the main thread. This way, for the 5 seconds it takes for the function to run, the app does not look frozen.

### Run code on a background thread

```swift
// Code in the main thread
DispatchQueue.global(qos: .background).async {
  // Some code that takes a long time to execute
}
```

### Run code on the main thread from a background thread

```swift
// Code in the main thread
DispatchQueue.global(qos: .background).async {
  // Some code that takes a long time to execute
  DispatchQueue.main.async {
    // More code in the main thread
  }
}
```

### Practical example

```swift
func didTapOnGenerateImageButton() {
  DispatchQueue.global(qos: .background).async {
  let newImage = ImageManager.generateImage() // This could take a long time
  DispatchQueue.main.async {
    self.imageView = newImage // The UI can only be updated on the main thread
  }
}

```

### Further reading

* [Dispatch documentation](https://developer.apple.com/documentation/dispatch)
