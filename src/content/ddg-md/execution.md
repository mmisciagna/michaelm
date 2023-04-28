---
title: Execution
tags:
  - Execution
---

Scalability was the name of the game for <a href="https://www.youtube.com/howyoutubeworks/" target="_blank">How YouTube Works</a>. It was imperative that a new page or subpage could easily be added or removed, localized and launched really quickly without worrying whether it would break the site or not. _**Otherwise, YouTube risked getting bad publicity or even sued.**_

The tools I had were an inhouse site builder written in Python and Flask and a CMS. Normally, we would hard code the paths in the backend. In this case, I wrote code in the backend to fetch documents from our CMS that would dynamically construct the paths. In this way and with a little training, any non-technical stakeholder could theoretically go into the CMS and create, read, update, or delete any page on the site. They could then file a ticket to have the site built and deployed into production. And because we had vendors in India to help maintain <a href="https://www.youtube.com/howyoutubeworks/" target="_blank">How YouTube Works</a>, an update could be deployed 24hrs a day.

Dynamic page creation was not the only novel solution that was needed. The pages were derived from templates, but the content was more or less like a blog. The stakeholder needed to be able to move elements, such as images, videos, paragraphs, around without having to re-localize everything or create schemas that covered every possible order of elements, which would have been impossible. To solve this problem, I developed a plugin for the CMS that allowed the stakeholders to write custom markdown in a textfield. The custom markdown would pull in other documents from collections that were composed of individual videos, images, buttons, lists, and other elements. It looked something like this:

```md
## Headline 2

This is a paragraph with text blah, blah, blah.
And here is an element added with custom markdown:

[ @collectionID=documentID ]

1. List item 1
1. List item 2
1. List item 3

```



