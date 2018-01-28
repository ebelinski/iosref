---
layout: default
title: Swift 4 guide&colon; control flow
description: A quick reference guide for control flow in Swift 4, with if, if-else, if-let, guard, for-in, while, and switch examples.
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

Guard statements can be used to reduce indentation on the happy path. In a guard statement, the _else_ branch _must_ transfer control to exit the code block containing the guard statement. This can be done with _return_, _break_, _continue_, or _throw_.

<div class="row"><div class="col-sm-6">

#### Simple guard

{% highlight swift %}
func divide(x: Int, y: Int) -> Int? {
  guard y != 0 else {
    print("You cannot divide by 0.")
    return nil
  }
  let answer = x / y
  return answer
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

### For-in

The common for loop `for (i = a; i < b; i++)` does not exist in Swift. Instead, the for-in can be modified to have an index using tuples and _[enumerated](https://developer.apple.com/documentation/swift/array/1687832-enumerated)_:

<div class="row"><div class="col-sm-6">

#### Simple for-in

{% highlight swift %}
let birds = ["Owl", "Crane"]
for bird in birds {
  print(bird)
}
// Output: 
// Owl
// Crane
{% endhighlight %}

</div><div class="col-sm-6">

#### For-in with index

{% highlight swift %}
let birds = ["Owl", "Crane"]
for (i, bird) in birds.enumerated() {
  print("[\(i)]: \(bird)")
}
// Output: 
// [0]: Owl
// [1]: Crane
{% endhighlight %}

</div></div>

### While

A while loop will run the code block each time the conditional is true. A repeat-while loop will run the block first without checking the conditional, then keep on running it as long as the conditional is true.

<div class="row"><div class="col-sm-6">

#### Simple while

{% highlight swift %}
var steps = 2
while steps > 0 {
  print("\(steps) steps left")
  steps -= 1
}
// Output:
// 2 steps left
// 1 steps left
{% endhighlight %}
{% highlight swift %}
var steps = -999
while steps > 0 {
  print("\(steps) steps left")
  steps -= 1
}
// Output: nothing
{% endhighlight %}

</div><div class="col-sm-6">

#### Repeat-while

{% highlight swift %}
var steps = 2
repeat {
  print("\(steps) steps left")
  steps -= 1
} while steps > 0
// Output:
// 2 steps left
// 1 steps left
{% endhighlight %}
{% highlight swift %}
var steps = -999
repeat {
  print("\(steps) steps left")
  steps -= 1
} while steps > 0
// Output: "-999 steps left"
{% endhighlight %}

</div></div>

### Switch

<div class="row"><div class="col-sm-6">

#### Switch with equality

A `default` case is necessary when not all cases are covered.

{% highlight swift %}
func describe(animal: String) {
  switch animal {
  case "Owl", "Crane": print("A bird")
  case "Lion": print("A feline")
  case "Ant": print("An insect")
  default: print("Something else")
  }
}
describe(animal: "Owl")
describe(animal: "Giraffe")
// Output: 
// "A bird"
// "Something else"
{% endhighlight %}

</div><div class="col-sm-6">

#### Switch with tuples

Here, all cases are covered, so a `default` case is unnecessary.

{% highlight swift %}
func describe(point: (Int, Int)) {
  switch point {
  case (0, 0): print("At origin")
  case (_, 0): print("On x-axis")
  case (0, _): print("On y-axis")
  case (_, _): print("Elsewhere")
  }
}
describe(point: (5, 0))
describe(point: (11, 9))
// Output: 
// "On x-axis"
// "Elsewhere"
{% endhighlight %}

</div></div>

### Further reading

* ["Control Flow" in _The Swift Programming Language_ by Apple](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/ControlFlow.html#//apple_ref/doc/uid/TP40014097-CH9-ID120)