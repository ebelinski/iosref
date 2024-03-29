---
layout: default
title: "Swift 4 guide: functions"
description: A quick reference guide for functions in Swift 4, with simple examples and functional examples.
redirect_from: 
  - /functions/ 
  - /function/
---
{::options parse_block_html="true" /}

{:.alert.alert-warning}
This page has moved to [swiftly.dev/functions](https://swiftly.dev/functions)! The archive below will not be updated.

Functions are a special type of [closures]({{ "/swift-closures" | relative_url }}). Functions are first-class types, so a function can be passed in as a parameter to another function. Also, a function can return another function.

* TOC
{:toc}

### Function with type `() -> ()`

This function takes no parameters, and returns nothing.

{% include opencol.html size=7 newrow=true %}
```swift
func greet() {
  print("Hello")
}
```
{% include closecol.html %}{% include opencol.html size=5 %}
```swift
greet()
// Output: "Hello"
```
{% include closecol.html closerow=true %}

### Function with type `(String) -> ()`

This function takes one parameter, a `String`, and returns nothing.

{% include opencol.html size=7 newrow=true %}
```swift
func greet(person: String) {
  print("Hello \(person)")
}
```
{% include closecol.html %}{% include opencol.html size=5 %}
```swift
greet(person: "Aliya")
// Output: "Hello Aliya"
```
{% include closecol.html closerow=true %}

### Function with type `(Int, Int) -> (Int)`

This function takes two parameters, both `Ints`, and returns an `Int`.

{% include opencol.html size=7 newrow=true %}
```swift
func multiply(x: Int, y: Int) -> Int {
  return x * y
}
```
{% include closecol.html %}{% include opencol.html size=5 %}
```swift
print(multiply(x: 5, y: 6))
// Output: "30"
```
{% include closecol.html closerow=true %}

### Function with a default parameter value

This function takes two parameters, both `Ints`, and returns an `Int`.

{% include opencol.html size=7 newrow=true %}
```swift
func greet(person: String = "guest") {
  print("Hello \(person)")
}
```

{% include closecol.html %}{% include opencol.html size=5 %}
```swift
greet()
greet(person: "Aliya")
// Output:
// Hello guest
// Hello Aliya
```
{% include closecol.html closerow=true %}

### Function that takes in another function as a parameter

The function `perform` has type `((Int, Int) -> Int, Int, Int) -> Int`.

{% include opencol.html size=7 newrow=true %}
```swift
func multiply(x: Int, y: Int) -> Int {
  return x * y
}
func perform(fn: (Int, Int) -> Int, 
             a: Int, 
             b: Int) -> Int {
  return function(a, b)
}
```

{% include closecol.html %}{% include opencol.html size=5 %}
```swift
let result = perform(fn: multiply, 
                     a: 5, 
                     b: 6)
print(result)
// Output: "30"
```
{% include closecol.html closerow=true %}

### Function that returns a function

The function `operation` has type `() -> (Int, Int) -> Int`.

{% include opencol.html size=7 newrow=true %}
```swift
func multiply(x: Int, y: Int) -> Int {
  return x * y
}
func operation() -> ((Int, Int) -> Int) {
  return multiply
}
```

{% include closecol.html %}{% include opencol.html size=5 %}
```swift
let myOperation = operation()
let result = myOperation(5, 6)
print(result)
// Output: "30"
```
{% include closecol.html closerow=true %}

### Further reading

* [Swift closures guide]({{ "/swift-closures" | relative_url }})
* [Functions (The Swift Programming Language)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html)
