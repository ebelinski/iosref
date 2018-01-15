---
layout: default
title: Swift 4 closures guide
---

Swift closures are blocks of functionality that are self-contained, and can be passed around. They are similar to _blocks_ in C and Objective-C, as well as _lambdas_ in other languages. [Functions]({{ "/swift-functions-guide" | relative_url }}) are a special type of closures.

### Closure expression syntax

Closures can be defined with _closure expression syntax_, which has the following general form:

<pre class="with-placeholders">
{ (<span class="placeholder">parameters</span>) -> <span class="placeholder">return type</span> in
  <span class="placeholder">statements</span>
}
</pre>

### Closure inline

Using closure expression syntax:

{% highlight swift %}
let myInts = [4, 30, 7, 9, 1]
let mySortedInts = myInts.sorted(by: { (x: Int, y: Int) -> Bool in
  return x > y
})
print(mySortedInts)
// Output: "[30, 9, 7, 4, 1]"
{% endhighlight %}

### Closure as a variable

A closure can be stored as a variable and used later. Using closure expression syntax:

{% highlight swift %}
let myClosure = { (x: Int, y: Int) -> Bool in
  return x > y
}

let myInts = [4, 30, 7, 9, 1]
let mySortedInts = myInts.sorted(by: myClosure)
print(mySortedInts)
// Output: "[30, 9, 7, 4, 1]"
{% endhighlight %}

### Closure as a function

A function is a type of closure, so a closure can be stored as a function to be used later.

{% highlight swift %}
func myClosure(x: Int, y: Int) -> Bool {
  return x > y
}

let myInts = [4, 30, 7, 9, 1]
let mySortedInts = myInts.sorted(by: myClosure)
print(mySortedInts)
// Output: "[30, 9, 7, 4, 1]"
{% endhighlight %}

### Further reading

* [Swift functions guide]({{ "/swift-functions-guide" | relative_url }})
* [Closures (The Swift Programming Language)](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html)
