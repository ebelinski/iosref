---
layout: default
title: Swift 4 closures guide
---

Swift closures are blocks of functionality that are self-contained, and can be passed around. They are similar to _blocks_ in C and Objective-C, as well as _lambdas_ in other languages.

### Defining a function

Functions are a special type of closures.

{% highlight swift %}
func cubed(x: Int) -> Int {
  return x * x * x
}
{% endhighlight %}

This creates a function with type `(Int) -> (Int)`.

### Using a function

{% highlight swift %}
let myInt = 4
let myIntCubed = cubed(x: myInt)
print(myIntCubed)
// Output: "64"
{% endhighlight %}

### Passing and returning functions

Functions are first-class types, so a function can return another function.

{% highlight swift %}
...
{% endhighlight %}

### Closure



### Further reading

* [Closures — The Swift Programming Language](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html)
