---
title: YouTube Trends Top Ten Lists 2022
apis: ['YouTube IFrame Player']
client: 'YouTube'
role: 'Frontend Engineer'
img: 'youtube-trends-2022.webp'
stack: ['Lit', 'TypeScript', 'SCSS', 'Express/Node', 'Webpack', 'Google Cloud']
videoId: '3N8kXXzU9-Y'
siteLink: 'http://youtube.com/trends/2022'
---

## Overview

A YouTube website providing insights on 2022's most popular videos.

## Challenges

We didn't have access to a comprehensive API for collecting the necessary data and insights. Therefore, we devised a system that allowed stakeholders to gather data in spreadsheets, which we then converted into JSON for the website.

Moreover, since the videos and insights differ depending on the country, stakeholders were required to input localized information into the spreadsheets. To simplify the process, we utilized the server's capability to detect users' locations and deliver the appropriate data automatically.

Furthermore, the information for any selected country can be translated. We utilized the browser's native API to identify the user's preferred language and verified whether the available data was translated into that language. If it was, it would be automatically presented to the user. They also have the flexibility to switch between available countries and languages at any time.