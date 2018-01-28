---
layout: default
title: Swift 4 cheatsheet
description: A beautiful and clutter-free Swift 4 cheatsheet.
---
{::options parse_block_html="true" /}
{% include opencol.html size=6 newrow=true %}

### Constants

{% highlight swift %}
let myInt = 5
let myString = "5.5"
{% endhighlight %}

### Variables

{% highlight swift %}
var myInt = 5
myInt = myInt + 5
{% endhighlight %}

### Type annotations

{% highlight swift %}
let myInt: Int = 5
let myString: String = "5.5"
{% endhighlight %}

### If statement

{% highlight swift %}
if 5 > 3 {
  print("5 is more than 3")
} else {
  print("5 is not more than 3")
}
// Output: "5 is more than 3"
{% endhighlight %}

### Optionals

{% highlight swift %}
let myInt: Int? = 5
if let unwrappedInt = myInt {
  print("myInt is \(unwrappedInt)")
}
// Output: "myInt is 5"
{% endhighlight %}

### Enum

{% highlight swift %}
enum CompassPoint {
  case north, south, east, west
}
var direction: CompassPoint = .north
{% endhighlight %}

### Switch statement

{% highlight swift %}
switch direction {
case .north: print("Going north!")
case .south: print("Going south...")
default: print("Going east or west.")
}
// Output: "Going north!"
{% endhighlight %}

{% include closecol.html %}{% include opencol.html size=6 %}

### Function with param and return

{% highlight swift %}
func square(x: Int) -> Int {
  let squaredValue = x * x
  return squaredValue
}
{% endhighlight %}

### Calling a function

{% highlight swift %}
let squareOf6 = square(x: 6)
print("Square of 6 is: \(squareOf6)")
// Output: "Square of 6 is: 36"
{% endhighlight %}

### Declaring a struct

{% highlight swift %}
struct MyStruct {
  var myInt: Int
  let myStr: String
  mutating func squareMyInt() {
    myInt = myInt * myInt
  }
}
{% endhighlight %}

### Instantiating a struct

{% highlight swift %}
var obj = MyStruct(myInt: 5,
                   myStr: "Hi! 👋")
obj.squareMyInt()
print("\(obj.myStr) \(obj.myInt)")
// Output: "Hi! 👋 25"
{% endhighlight %}

### Array

{% highlight swift %}
var myArr = [1, 3]
myArr.append(5)
{% endhighlight %}

### Loop over array

{% highlight swift %}
var sum = 0
for element in myArr {
  sum += element
}
print(sum)
// Output: "9"
{% endhighlight %}

{% include closecol.html closerow=true %}
