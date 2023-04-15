---
date: 4/14/2023
title: Hide focus outlines when NOT using a keyboard
tags:
  - A11y
  - CSS
---

Have you ever submitted your dev project to a designer or project manager for review and they ask about the reason behind having a blue border surrounding the links and buttons? And they still ask you to remove it after you explain to them that it's necessary for accessibility and that users who navigate the site with a keyboard will appreciate it?

![YouTube logo with focus outline](https://storage.googleapis.com/michaelm.appspot.com/tidbits-imgs/yt-trends-2022-logo-outline.webp)

**Well good news!**

You can hide focus outlines until the users starts using the keyboard with the `:focus:not(:focus-visible)` pseudo class.

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
