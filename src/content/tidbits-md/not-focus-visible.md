---
date: 4/14/2023
title: Remove focus outlines when NOT navigating with a keyboard
tags:
  - A11y
  - CSS
---

Have you ever submitted a dev project to a designer or project manager for review and they ask why there's a blue border around the links and buttons? And they still ask you to remove it after you explain to them that it's necessary for accessibility and that users who navigate the site with a keyboard will appreciate it?

![YouTube logo with focus outline](https://storage.googleapis.com/michaelm.appspot.com/tidbits-imgs/yt-trends-2022-logo-outline.webp)

**Well good news!**

You can remove focus outlines when users are not using the keyboard to navigate with the `:focus:not(:focus-visible)` pseudo class.

**SCSS**

```
// Not an exhaustive list of focusable elements.
a,
button,
select,
iframe,
input,
textarea,
[role='button'] {
  &:focus:not(:focus-visible) {
    outline: none;
  }
}
```

Read more about <a href="https://css-tricks.com/standardizing-focus-styles-with-css-custom-properties/" target="_blank" rel="noopener noreferrer">Standardizing Focus Styles</a>.
