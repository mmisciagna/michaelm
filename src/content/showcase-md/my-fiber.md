---
title: 'My Fiber (prototype)'
client: 'Google Fiber'
role: 'Frontend Engineer'
img: 'my-fiber.webp'
description: MyFiber
stack: ['AngularJS', 'SCSS', 'Firebase Database', 'Google Cloud']
videoId: 'YSMDyjB-LDc'
---

### Goal

Prototype a new, user-friendly, responsive global navigation system that can be easily adapted for both marketing and engineering builds, utilizing Material design components.

### Challenges

The UX Researcher wanted to tailor the content based on the user during testing, without needing my assistance or requiring her to modify the code. To enable this functionality, we leveraged Firebase. This platform enabled users to update content, such as network name, password, and contact information, in real-time, with changes being immediately reflected across all pages of the prototype.

To achieve the designer's objective of allowing card heights to dynamically adjust to their content, we employed the Masonry JS plugin. The Angular Material grid layout did not allow for this feature, but with Masonry, the cards could be smoothly reorganized on window resize, and a pleasant animation effect was achieved.