---
title: Did you know about `Set()`?
tags:
  - JS
---

Use the native JavaScript API <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set" target="_blank" rel="noopener noreferrer">`Set()`</a> to store **unique numbers** in an array:

  ```
  const set = new Set([1, 2, 3, 4, 5, 5, 5]);
  console.log(set); // [1, 2, 3, 4, 5]
  ```

  `Set()` make it super easy to add, remove, or check if a value exists:

  ```
  const set = new Set([1, 2, 3, 4, 5, 5, 5]);

  console.log(set.has(5)); // true
  console.log(set.has(7)); // false

  set.delete(5);

  console.log(set); // [1, 2, 3, 4]
  ```
