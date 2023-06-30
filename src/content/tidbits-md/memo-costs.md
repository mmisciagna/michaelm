---
date: 4/10/2023
title: Freedom isn't free, and neither is memoizing
tags:
  - React
  - JS
---

Memoization is a performance enhancement approach that stores the output of a resource-intensive function in a cache, enabling subsequent usage of the output without re-executing the function multiple times.

React provides two hooks, namely `useMemo()` and `useCallback()`, to facilitate this task. The former stores the output of a function, while the latter caches the function itself.

Why not apply memoization to all functions by default? In a nutshell, memoization comes at a cost. It adds additional complexity, and if you apply it to trivial calculations, you might end up doing the opposite of what you intended to do — optimize your app. For example, if you're memoizing a speedy operation like `str.split('/')`, the overhead of memoization might surpass the performance gains, and it would be faster to call `split()` on each re-render.

This <a href="https://javascript.plainenglish.io/stop-using-usememo-now-e5d07d2bbf70" target="_blank" rel="noopener noreferrer">article</a> explains when and when not to moemoize with React pretty well.
