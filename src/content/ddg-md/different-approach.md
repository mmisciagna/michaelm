---
title: A Different Approach
tags:
  - A Different Approach
---

The sheer amount of content on <a href="https://www.youtube.com/howyoutubeworks/" target="_blank">How YouTube Works</a> would have been better handled outside of the CMS. The schemas got very complicated due to all of the localizations and locale-specific content. It required us to write docs and provide training in order to get stakeholders comfortable enough to  start making updates.

I think a better approach would be to place all content, localized or not, in spreadsheets curated by the stakeholders. We could then find or build a simple tool to convert the spreadsheets’ content into JSON. Only the JSON files would be deployed and a SPA framework like React or Angular could hydrate the DOM on the client side. However, that comes with its own difficulties. Google’s static site  infrastructure makes it difficult to build SPA projects on top of  the security reviews that make using third-party libraries a hassle to get approved. Also, <a href="https://www.youtube.com/howyoutubeworks/" target="_blank">How YouTube Works</a> relies heavily on SEO, and client side SPA projects are more difficult to optimize for search engines.



