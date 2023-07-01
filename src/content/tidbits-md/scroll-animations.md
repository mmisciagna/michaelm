---
date: 6/19/2023
title: Scroll Animations with CSS, say what?!
tags:
  - CSS
  - Experimental
---

Alas, the many designs that have been handed over to me that require animations on scroll! Too many to count, and it was never straight forward. I either used a third-party library like <a href="https://animejs.com/" target="_blank">AnimeJS</a> or got creative with <a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API" target="_blank">Intersection Observer</a>.

CSS `animation-timeline` is here to save the day! ... rather <a href="https://caniuse.com/?search=animation-timeline" target="_blank">_almost_</a> here. At the time of writing this, `animation-timeline` is still experimental.

Soon we will be able to write an ol' fashioned CSS `animation`, pair it with the all new `animation-timeline`, and finally give it either a progress or view range with `animation-range`.

To see the following example working, you'll have to be in Chrome and have _Experimental Web Platform features_ enabled at <a href="chrome://flags/" target="_blank">chrome://flags</a>. What you'll see is a blue area fade in when it has come into view:

<iframe
  src="https://codesandbox.io/embed/animation-timeline-test-qqyk52?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="animation-timeline-test"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
</iframe>

```
  // Ol' fashioned CSS animation
  animation: 1s ease-in-out opacityAnimation;

  // Enables scroll animation.
  //`block` === y-axis; `root` === <body>
  animation-timeline: scroll(block root);

  // Starts animation when blue section enters.
  // Ends animation when element is fully in view.
  animation-range: contain;
```

Read this <a href="https://dev.to/link2twenty/future-of-css-scroll-animations-52ia" target="_blank">article</a> to learn more about CSS scroll animations.
