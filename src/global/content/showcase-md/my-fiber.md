### Goal

Build a responsive prototype to the designer's pixel-perfect specs for mobile testing using Material design elements.


### Challenges

For testing, the UX Researcher wanted to adjust the content based on the user so using Firebase to let her do that without my support or getting into the code herself was important. Firebase also allowed for the user to update content (i.e. Network name, password, contact info) in real-time while reflecting the updates on every page of the prototype.

Angular's Material grid layout doesn't allow the card height to adjust with the content. Using the Masonry JS plugin to allow for dynamic card heights was an easy way to achieve the designer's goal while at the same time adding a nice animation when the cards reorganize themselves on window resize.