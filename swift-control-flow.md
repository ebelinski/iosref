---
layout: default
title: Swift 4 control flow quick reference
description: 
---

{::options parse_block_html="true" /}

* TOC
{:toc}

### If

<div class="row"><div class="col-sm-6">

#### Simple if

{% highlight swift %}
if 5 > 3 {
  print("5 is more than 3")
}
// Output: "5 is more than 3"
{% endhighlight %}

#### If-else

{% highlight swift %}
if 5 > 6 {
  print("5 is more than 6")
} else {
  print("5 is not more than 6")
}
// Output: "5 is more than 3"
{% endhighlight %}

</div><div class="col-sm-6">

#### If let

{% highlight swift %}
func greet(name: String?) {
  if let unwrappedName = name {
    print("Hello \(unwrappedName)!")
  } else {
    print("Hello guest!")
  }  
}
greet(name: "Asma")
greet(name: nil)
// Output: 
// Hello Asma!
// Hello guest!
{% endhighlight %}

</div></div>

### Guard

In a `guard` statement, the `else` branch _must_ transfer control to exit the code block containing the `guard` statement. This can be done with `return`, `break`, `continue`, or `throw`. Guard statements can be used to reduce indentation on the happy path.

<div class="row"><div class="col-sm-6">

#### Simple guard

{% highlight swift %}
func divide(x: Int, y: Int) -> Int? {
  guard y != 0 else {
    print("You cannot divide by 0.")
    return nil
  }
  return x / y
}
print(divide(x: 5, y: 0))

// Output: 
// You cannot divide by 0.
// nil
{% endhighlight %}

</div><div class="col-sm-6">

#### Guard let

{% highlight swift %}
func greet(name: String?) {
  guard let unwrapped = name else {
    print("Hello guest!")
    return
  }
  print("Hello \(unwrapped)!")
}
greet(name: "Asma")
greet(name: nil)
// Output: 
// Hello Asma!
// Hello guest!
{% endhighlight %}

</div></div>

### Switch

### For-in

### While

### Repeat-while

### Early return

### Further reading

* ["Control Flow" in _The Swift Programming Language_ by Apple](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ControlFlow.html#//apple_ref/doc/uid/TP40014097-CH9-ID120)