# Camellia

Camellia is a browser extension that helps you access hundreds of bookmarks on the page that appears when you open new tab in your browser. 1st gen Camellia is available as [Google Chrome extension in Chrome Store](https://chrome.google.com/webstore/detail/camellia/mamdkoclkocaejomjcaldmlgfgkgalnl).

## Camellia 2.0 (2nd gen)

![Second generation's interface](https://user-images.githubusercontent.com/12474739/84573023-abfecb80-ada6-11ea-8b69-ef39955ef4fd.png)

First generation of Camellia has very bad architecture and code under the hood which makes it painful to make significant changes, so I've decided to stop its support. At this moment second generation of Camellia is in development. Second generation is creating from scratch: new codebase, move from Vue.js to React, new architecture, only project's goals remained the same. It will be the same Camellia you loved some day, but better. It will also finally support Firefox and maybe Safari.

Look at the screen shot attached above (please note that it's early build, something may change). I am focusing on first-class support of touch interfaces, high DPG displays (such as Retina) and screens with various sizes. It will also look more modern, cleaner and more organic.

## FAQ

### When will it be released?

Camellia is just my non-profit pet-project which I do in free time. That's why I do not have any exact plans when to release it. Hopefully in 2021-2022.

### What features will ba available?

Only refreshed design and minor improvements are planned for initial release. My goal is to provide as smooth update to 2.0 as possible, most of the job will be done under the hood of the app. New features, such as heavily requested [ability to manage bookmarks right within Camellia](https://github.com/camellia-app/camellia/issues/12), will arrive in future updates.

### How can I update to new Camellia after release?

Your 1st gen Camellia will automatically update to 2nd gen, so no additional actions required. However, if you'll prefer 1st gen version for some reason, there will be an option to install it separately via CRX-file.

### How do I get 2nd gen Camellia right now?

You may build it from source files. However, it's not recommended for most users.

### What browsers will be supported?

Camellia will be uploaded to Chrome Store and will be available on all browsers compatible with the store. Camellia for Firefox will arrive in future updates. Safari version is also on roadmap, but Safari extension API and development flow requires some investigation.

### How can I help, contribute, speed-up process?

Here's how you can help:

- [Draw a cool logo for Camellia](https://github.com/camellia-app/camellia/issues/34)
- Provide some code review and suggest any improvements
- Tell your friends about Camellia 😏
