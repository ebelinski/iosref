---
layout: default
title: Objective-C guide&colon; block syntax
description: A quick reference guide for block syntax in Objective-C.
redirect_from: 
  - /fuckingblocksyntax/
  - /goshdarnblocksyntax/
---

### As a local variable

```
returnType (^blockName)(parameterTypes) = ^returnType(parameters) {...};
```

### As a property

```
@property (nonatomic, copy, nullability) returnType (^blockName)(parameterTypes);
```

### As a method parameter

```
- (void)methodThatTakesABlock:(returnType (^nullability)(parameterTypes))blockName;
```

### As an argument to a method call

```
[someObject methodThatTakesABlock:^returnType (parameters) {...}];
```

### As a `typedef`

```
typedef returnType (^TypeName)(parameterTypes);
TypeName blockName = ^returnType(parameters) {...};
```
