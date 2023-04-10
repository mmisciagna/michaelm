---
date: 4/6/2023
title: Get in the habit if using `Intl()`
tags:
  - JS
---

The <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank" rel="noopener noreferrer">`Intl()`</a> is one of my favorite native JavaScript APIs 'cause it makes formatting dates, times, currencies, and practically any other type of number in any locale incredibly easy. For example, to get today's date in U.S. and European formats:

```
const today = new Date();

// U.S.
const usDate = new Intl.DateTimeFormat('en-US');
// Italy
const italyDate = new Intl.DateTimeFormat('it-it');

usDate.format(today);
italyDate.format(today);
```
