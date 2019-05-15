---
layout: default
title: Swift 5 cheatsheet
description: A beautiful and clutter-free Swift 5 cheatsheet.
redirect_from: 
  - /cheatsheet/
---
{::options parse_block_html="true" /}

{% include opencol.html size=6 newrow=true %}

### Constants

```swift
let myInt = 5
let myString = "5.5"
```

### Variables

```swift
var myInt = 5
myInt = myInt + 5
```

### Type annotations

```swift
let myInt: Int = 5
let myString: String = "5.5"
```

### If statement

```swift
if 5 > 3 {
  print("5 is more than 3")
} else {
  print("5 is not more than 3")
}
// Output: "5 is more than 3"
```

### Optionals

```swift
let myInt: Int? = 5
if let unwrappedInt = myInt {
  print("myInt is \(unwrappedInt)")
}
// Output: "myInt is 5"
```

### Enum

```swift
enum CompassPoint {
  case north, south, east, west
}
var direction: CompassPoint = .north
```

### Switch statement

```swift
switch direction {
case .north: print("Going north!")
case .south: print("Going south...")
default: print("Going east or west.")
}
// Output: "Going north!"
```

{% include closecol.html %}{% include opencol.html size=6 %}

### Function with param and return

```swift
func square(x: Int) -> Int {
  let squaredValue = x * x
  return squaredValue
}
```

### Calling a function

```swift
let squareOf6 = square(x: 6)
print("Square of 6 is: \(squareOf6)")
// Output: "Square of 6 is: 36"
```

### Declaring a struct

```swift
struct MyStruct {
  var myInt: Int
  let myStr: String
  mutating func squareMyInt() {
    myInt = myInt * myInt
  }
}
```

### Instantiating a struct

```swift
var obj = MyStruct(myInt: 5,
                   myStr: "Hi! 👋")
obj.squareMyInt()
print("\(obj.myStr) \(obj.myInt)")
// Output: "Hi! 👋 25"
```

### Array

```swift
var myArr = [1, 3]
myArr.append(5)
```

### Loop over array

```swift
var sum = 0
for element in myArr {
  sum += element
}
print(sum)
// Output: "9"
```

{% include closecol.html closerow=true %}
