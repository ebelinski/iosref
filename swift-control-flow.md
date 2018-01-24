---
layout: default
title: Swift 4 control flow quick reference
description: 
---

* TOC
{:toc}

### If

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

#### If let

{% highlight swift %}
let name: String? = "Asma"
if let unwrappedName = name {
  print("Hello \(unwrappedName)!")
} else {
  print("Hello guest!")
}
// Output: "Hello Asma!"
{% endhighlight %}

### Guard



### Switch

### For-in

### While

### Repeat-while

### Early return