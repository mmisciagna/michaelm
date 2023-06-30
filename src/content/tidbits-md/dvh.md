---
date: 4/6/2023
title: Stop using `vh` and start using `dvh`!
tags:
  - CSS
---

Sometimes you want the current view to take up the entire viewport. The simple way to do this is to use `100vh`. The problem with this solution is that it doesn't take mobile UI elements into account. So when the address bar slides down or up in your mobile browser, your view is all of sudden being cutoff.

What's the better solution? Use `100dvh` instead, which _does_ take mobile UI element elements into account. Now your view will never be cutoff. It's <a href="https://caniuse.com/?search=dvh" target="_blank" rel="noopener noreferrer">almost universally supported</a>.

This YouTube video explains it pretty well:

<iframe src="https://www.youtube.com/embed/iOKPupWYGgs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
