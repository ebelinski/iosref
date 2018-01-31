---
layout: default
title: Swift 4 guide&colon; closures
description: A quick reference guide for closures in Swift 4, with inline closures, closures as variables, and closures as functions.
---

Swift closures are blocks of functionality that are self-contained, and can be passed around. They are similar to _blocks_ in C and Objective-C, as well as _lambdas_ in other languages. [Functions]({{ "/swift-functions" | relative_url }}) are a special type of closures.

* TOC
{:toc}

### Closure expression syntax

Closures can be defined with _closure expression syntax_, which has the general form:

<pre class="with-placeholders">
{ (<span class="placeholder">parameters</span>) -> <span class="placeholder">return type</span> in
  <span class="placeholder">statements</span>
}
</pre>

### Closure inline

Using **closure expression syntax**:

```swift
let sortedInts = [4, 30, 7, 9, 1].sorted(by: { (x: Int, y: Int) -> Bool in
  return x < y
})
```

Because this closure is the last argument of `sorted`, the **parentheses** are optional:

```swift
let sortedInts = [4, 30, 7, 9, 1].sorted() { (x: Int, y: Int) -> Bool in
  return x < y
}
```

When the argument and/or return types are known, the **type annotations** are optional:

```swift
let sortedInts = [4, 30, 7, 9, 1].sorted() { x, y in
  return x < y
}
```

Also, closure parameters can be referenced by **position** instead of by name:

```swift
let sortedInts = [4, 30, 7, 9, 1].sorted() { $0 > $1 }
```

### Closure as a variable

A closure can be stored as a variable and used later. Using closure expression syntax:

```swift
let myClosure = { (x: Int, y: Int) -> Bool in
  return x > y
}
let sortedInts = [4, 30, 7, 9, 1].sorted(by: myClosure)
```

### Closure as a function

A [function]({{ "/swift-functions" | relative_url }}) is a type of closure, so a closure can be stored as a function to be used later.
<!-- Extra line needed for Sublime Text markdown syntax highlighting issue. -->

```swift
func myClosure(x: Int, y: Int) -> Bool {
  return x > y
}
let sortedInts = [4, 30, 7, 9, 1].sorted(by: myClosure)
```

### Function with a closure parameter

A function can be created with a closure parameter:

```swift
func multiply(x: Int, y: Int, completion: (Int) -> Void) {
  completion(x * y)
}
multiply(x: 5, y: 6) { print($0) } // Output: 30
```

A closure parameter may be **optional**:

```swift
func multiply(x: Int, y: Int, completion: ((Int)? -> Void)) {
  completion?(x * y)
}
multiply(x: 5, y: 6) { print($0) } // Output: 30
```

It may have **labeled** arguments for readability:<sup>1</sup>

```swift
func multiply(x: Int, y: Int, completion: (_ result: Int) -> Void) {
  completion(x * y)
}
multiply(x: 5, y: 6) { print($0) } // Output: 30
```

Or **multiple** arguments: 

```swift
func multiply(x: Int, y: Int, completion: (Int, Error?) -> Void) {
  completion(x * y, nil)
}
multiply(x: 5, y: 6) { print($0) } // Output: 30
```

Or **no** arguments:

```swift
func multiply(x: Int, y: Int, completion: () -> Void) {
  completion()
}
multiply(x: 5, y: 6) { } // Does nothing
```

### Function with an `@escaping` closure parameter

An escaping closure can be called even after the function has returned.<sup>2</sup>

```swift
func multiplyRemotely(x: Int, y: Int, completion: @escaping (Int) -> Void) {
  APIManager.shared.multiply(x: x, y: y, completion: completion)
}
multiplyRemotely(x: 5, y: 6) { print($0) }
// Output: 30
```

### Notes

1. It is commonly asked why the argument names don't appear in the closure call, like `completion(result: x * y)`. The reason for this is that as of Swift 3, closure argument labels are [no longer part of the closure type](https://github.com/apple/swift-evolution/blob/master/proposals/0111-remove-arg-label-type-significance.md).
2. This makes it possible to make a network call to a remote server, return the function, then have the closure get executed when the server response is received. The benefit of this is that the rest of the execution of the function, and subsequently parent functions, do not have to get blocked while the app waits for a response.

### Further reading

* [Swift functions guide]({{ "/swift-functions" | relative_url }})
* [Closures (The Swift Programming Language)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html)
