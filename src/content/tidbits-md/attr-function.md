---
date: 4/7/2023
title: Why didn't I know about CSS `attr()` function sooner!?
tags:
  - CSS
---

You can use a value from any HTML attribute within pseudo `::before` or `::after` CSS selectors with the `attr()` function.

**HTML**

```html
<button data-count="3">
  Click
</button>
```

**CSS**

```css
button::after {
  content: attr(data-count);
  ... styles
}
```

Whatch this <a href="https://youtu.be/XU2MxPWbvGM" target="_blank" rel="noopener noreferrer">Shorts video</a> on YouTube.
