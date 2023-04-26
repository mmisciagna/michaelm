---
date: 4/8/2023
title: Creating unique keys for React loops
tags:
  - React
  - JS
---

React loops require each item to have a unique key:

```js
{SOME_DATA.map((item: DataItem) => {
  return <div key={<unique_key>}> ... </div>
})}
```

It'd be nice if each item had a key with a unique value that you could use:

```js
[
  {
    id: <unique_value>,
    ...
  },
  {
    id: <unique_value>,
    ...
  },
]
```

Unfortunately, you don't always control the data coming in, so how do you create a unique key for your items when one is not available? There are a few ways you can do this, but for this tidbit, let's talk about <a href="https://www.npmjs.com/package/uuid" target="_blank" rel="noopener noreferrer">UUID NPM package</a>. After installing it, simply do this:

```js
import { v4 as uuidv4 } from 'uuid';

{SOME_DATA.map((item: DataItem) => {
  return <div key={uuidv4()}> ... </div>
})}
```
