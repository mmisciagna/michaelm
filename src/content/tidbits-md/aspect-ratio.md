---
date: 4/16/2023
title: CSS `aspect-ratio`
tags:
  - CSS
---

I use to keep a SCSS mixin handy for giving an element a specific aspect ratio. It looked like this:

```css
@mixin aspect-ratio($width: 1, $height: 1) {
  padding-bottom: calc(($width / $height) * 100%);
  width: 100%;
  ...
}
```

For instance, whenever I wanted to embed a video I would write:

```css
.video-wrapper {
  @include aspect-ratio(16, 9);
}
```

There's now a CSS property called `aspect-ratio` that does all of the mixin stuff for us. So instead of including a mixin I can simply write `aspect-ratio: 16 / 9` and get rid of the mixin altogether.

It's <a href="https://caniuse.com/?search=aspect-ratio" target="_blank" rel="noopener noreferrer">well supported</a> by all major browsers too.

**Demo**

<div style="aspect-ratio: 16 / 9; background: cornflowerblue; display: flex; align-items: center; justify-content: center; font-size: 3em; font-weight: 700; font-family: var(--font-stack-mono);">
  16:9
</div>
