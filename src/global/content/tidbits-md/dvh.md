---
title: Stop using `vh`; start using `dvh`!
tags:
  - CSS
---

Sometimes you want the current view to take up the entire viewport. The simple way to do this is to use `100vh`. The problem with this solution is that it doesn't take mobile UI elements into account. So when the address bar slides down or up in your mobile browser, your view is all of sudden being cutoff.

What's the better solution? Use `100dvh` instead, which _does_ take mobile UI element elements into account. Now your view will never be cutoff. It's [almost universally supported](https://caniuse.com/?search=dvh).

This [YouTube video](https://www.youtube.com/watch?v=iOKPupWYGgs) explains it pretty well.
