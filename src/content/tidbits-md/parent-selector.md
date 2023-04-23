---
date: 4/23/2023
title: There's a CSS parent selector!
tags:
  - CSS
---

How many times have you wished you could style the parent of an element in CSS? So many times right?! Well now you can with the `:has()` pseudo-class. For example, you can style a button with an `SVG` differently than other buttons like this:

**HTML**

```
<!-- Plain button -->
<button>Add</button>

<!-- Button with SVG icon -->
<button>
  <svg></svg>
  Add
</button>
```

**CSS**

```
button:has(svg) {
  /* Styles */
}
```

Here's that very example and more on <a href="https://css-tricks.com/almanac/selectors/h/has/" target="_blank">CSS-Tricks</a>.
