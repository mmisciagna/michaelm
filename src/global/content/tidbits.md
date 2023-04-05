## Did you know about `Set()`?

Use the native JavaScript API <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set" target="_blank" rel="noreferrer noopenner">Set()</a> to store **unique numbers** in an array:

```
const set = new Set([1, 2, 3, 4, 5, 5, 5]);
console.log(set); // [1, 2, 3, 4, 5]
```

`Set()` make it super easy to add, remove, or check if a value exists:

```
const set = new Set([1, 2, 3, 4, 5, 5, 5]);

console.log(set.has(5)); // true
console.log(set.has(7)); // false

set.delete(5);

console.log(set); // [1, 2, 3, 4]
```

<hr/>

## Get in the habit if using `Intl()`

The <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank" rel="noreferrer noopenner">Intl()</a> is one of my favorite native JavaScript APIs 'cause it makes formatting dates, times, currencies, and practically any other type of number in any locale incredibly easy. For example, to get today's date in U.S. and European formats:

```
const today = new Date();

// U.S.
const usDate = new Intl.DateTimeFormat('en-US');
// Italy
const italyDate = new Intl.DateTimeFormat('it-it');

usDate.format(today);
italyDate.format(today);
```

<hr/>

## Stop using `vh`; start using `dvh`!

Sometimes you want the current view to take up the entire viewport. The simple way to do this is to use `100vh`. The problem with this solution is that it doesn't take mobile UI elements into account. So when the address bar slides down or up in your mobile browser, your view is all of sudden being cutoff.

What's the better solution? Use `100dvh` instead, which _does_ take mobile UI element elements into account. Now your view will never be cutoff. It's <a href="https://caniuse.com/?search=dvh" target="_blank" rel="noreferrer noopenner">almost universally supported</a>.

This <a href="https://www.youtube.com/watch?v=iOKPupWYGgs" target="_blank" rel="noreferrer noopenner">YouTube video</a> explains it pretty well.