---
layout: default
title: Swift 4 functions guide
---

Functions are a special type of [closures]({{ "/swift-closures-guide" | relative_url }}). Functions are first-class types, so a function can be passed in as a parameter to another function. Also, a function can return another function.

### Function with type `() -> ()`

This function takes no parameters, and returns nothing.

{% highlight swift %}
func greet() {
  print("Hello")
}

greet()
// Output: "Hello"
{% endhighlight %}

### Function with type `(String) -> ()`

This function takes one parameter, a `String`, and returns nothing.

{% highlight swift %}
func greet(person: String) {
  print("Hello \(person)")
}

greet(person: "Aliya")
// Output: "Hello Aliya"
{% endhighlight %}

### Function with type `(Int, Int) -> (Int)`

This function takes two parameters, both `Ints`, and returns an `Int`.

{% highlight swift %}
func multiply(x: Int, y: Int) -> Int {
  return x * y
}

let result = multiply(x: 5, y: 6)
print(result)
// Output: "30"
{% endhighlight %}

### Function that takes in another function as a parameter

The function `performOperation` has type `((Int, Int) -> Int, Int, Int) -> Int`.

{% highlight swift %}
func multiply(x: Int, y: Int) -> Int {
  return x * y
}

func performOperation(function: (Int, Int) -> Int, a: Int, b: Int) -> Int {
  return function(a, b)
}

let result = performOperation(function: multiply, a: 5, b: 6)
print(result)
// Output: "30"
{% endhighlight %}

### Function that returns a function

The function `performOperation` has type `((Int, Int) -> Int, Int, Int) -> Int`.

{% highlight swift %}
func multiply(x: Int, y: Int) -> Int {
  return x * y
}

func operation() -> ((Int, Int) -> Int) {
  return multiply
}

let myOperation = operation()
let result = myOperation(5, 6)
print(result)
// Output: "30"
{% endhighlight %}

### Further reading

* [Swift closures guide]({{ "/swift-closures-guide" | relative_url }})
* [Functions (The Swift Programming Language)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html)
