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

### Passing and returning functions

{% highlight swift %}
...
{% endhighlight %}
