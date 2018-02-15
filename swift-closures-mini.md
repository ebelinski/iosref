---
layout: default
title: Swift 4 mini guide&colon; closures
description: A mini reference guide for closures in Swift 4.
redirect_from: 
  - /closures-mini/ 
  - /closure-mini/
  - /block-mini/
  - /blocks-mini/
  - /lambda-mini/
  - /lambdas-mini/
---

The mini version of the [closures guide]({{ "/swift-closures" | relative_url }}).

### Closure inline

```swift
let sorted1 = [4, 30, 7].sorted(by: { (x: Int, y: Int) -> Bool in 
  return x < y 
})
// Equivalent shorter version:
let sorted2 = [4, 30, 7].sorted() { $0 > $1 }
```

### Closure as a function parameter

```swift
func multiply(x: Int, y: Int, completion: @escaping (Int, Error?) -> Void) {
  completion(x * y, nil)
}
multiply(x: 5, y: 6) { print($1 ?? $0) } // Output: 30
```

Note: Because this closure is escaping, it could be called even after the function returns.